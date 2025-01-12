import jwt, uuid, time
from datetime import datetime, timedelta
from functools import wraps
from django.conf import settings
from .models import Users
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator
import math

def _debuger(msg):
    if settings.DEBUG:
        print(msg)
    else:
        pass

statuscodemapper = {
    200: status.HTTP_200_OK,
    201: status.HTTP_201_CREATED,
    204: status.HTTP_204_NO_CONTENT,
    301: status.HTTP_301_MOVED_PERMANENTLY,
    400: status.HTTP_400_BAD_REQUEST,
    401: status.HTTP_401_UNAUTHORIZED,
    404: status.HTTP_404_NOT_FOUND,
    409: status.HTTP_409_CONFLICT,
    500: status.HTTP_500_INTERNAL_SERVER_ERROR,
    502: status.HTTP_502_BAD_GATEWAY
}

class GlobalAccess():
    def __init__(self):
        self.data = decoded_data

def get_access_token(user):
    print('GENERATING ACCESS TOKEN: STARTED')
    expiry_days = datetime.now() + timedelta(days=1)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title(), 'company': user.company.id}
    payload['iat'] = datetime.now()
    payload['iss'] = 'etbackend'
    payload['exp'] = int(expiry_days.strftime('%s'))
    accesstoken = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
    print('GENERATING ACCESS TOKEN: ENDED')
    return accesstoken

def get_refresh_token(user):
    print('GENERATING REFRESH TOKEN: STARTED')
    expiry_days = datetime.now() + timedelta(days=7)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title(), 'company': user.company.id}
    payload['iat'] = datetime.now()
    payload['iss'] = 'etbackend'
    payload['exp'] = int(expiry_days.strftime('%s'))
    refreshtoken = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
    print('GENERATING REFRESH TOKEN: ENDED')
    return refreshtoken

def calc_time_left(exp_epoch):
    return datetime.fromtimestamp(exp_epoch) - datetime.now()

def decode_uuid(id):
    return uuid.UUID(id).hex # converts string to UUID


def validate_token(request):
    # return {'status': True, 'data': '', 'access': '', 'refresh': ''}
    try:
        access = request.COOKIES.get('access')
        refresh = request.COOKIES.get('refresh')
    except:
        return {'status': False, 'data': '', 'access': '', 'refresh': ''}
    try:
        print("ACCESS TOKEN BLOCK")
        if access:
            decoded_token = jwt.decode(jwt=access, key=settings.SECRET_KEY, algorithms='HS256')
            timeleft = calc_time_left(decoded_token['exp'])
            print("Time left for access token", timeleft)
            print('VALID ACCESS TOKEN => AUTHORIZED')
            return {'status': True, 'data': decoded_token, 'access': access, 'refresh': refresh}
        else:
            print('NO ACCESS TOKEN, SO NOT LOGGEDIN => UNAUHTORIZED')
            return {'status': False, 'data': '', 'access': access, 'refresh': refresh}
    except:
        try:
            print('ACCESS TOKEN EXPIRED')
            print("REFRESH TOKEN BLOCK")
            if refresh:
                decoded_refresh = jwt.decode(jwt=refresh, key=settings.SECRET_KEY, algorithms='HS256')
                timeleft = calc_time_left(decoded_refresh['exp'])
                id = decode_uuid(decoded_refresh['sub'])
                user = Users.objects.filter(id=id).first()
                print("Time left for refresh token", timeleft)
                print('VALID REFRESH SO GENERATES NEW ACCESS TOKEN => AUTHORIZED')
                newaccess = get_access_token(user)
                return {'status': True, 'data': decoded_refresh, 'access': newaccess, 'refresh': refresh}
            else:
                print('BOTH TOKENS EXPIRED/TAMPERED  => UNAUTHORIZED')
                return {'status': False, 'data': '', 'access': '', 'refresh': ''}
        except:
            print('BOTH TOKENS EXPIRED/TAMPERED => UNAUTHORIZED')
            return {'status': False, 'data': '', 'access': '', 'refresh': ''}


def login_required(function=None):
    def decorator(view_func):
        @wraps(view_func)
        def inner(request, *args, **kwargs):
            try:
                requestObj = request.request # IMPORTANT: For class-based APIs, because when decorator is applied it returns the instance of a class rather that request object itself
                print('REQUEST FROM CLASS-BASED API')
            except:
                requestObj = request
                print('REQUEST FROM FUNCTION BASED API')
            token = validate_token(requestObj)
            if token['status']:
                print('TOKEN VALIDATED SUCCUSSFULLY => REQUEST AUTHORIZED')
                global decoded_data
                decoded_data = token['data']
                access, refresh = token['access'], token['refresh']
                print("EXECUTING API LOGIC: STARTED")
                start = time.time()
                data, statuscode = view_func(request, *args, **kwargs) # Main login
                end = time.time()
                print("EXECTION: ENDED")
                print('TOTAL EXECUTION TIME: ', int(end-start))
                response = Response({"msg": "authorized"}, status=statuscodemapper[statuscode])
                response.set_cookie('access', access)
                response.set_cookie('refresh', refresh)
                response.data = data
                print("SETTING UP DATA AND MSG IN THE RESPONSE OBJECT: FINISHED")
                return response
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return inner
    
    if function is not None:
        return decorator(function)
    return decorator

def admin_required(func=None):
    def decorator(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            print("------------ admin check, --------------")
            id, role, *others = decoded_data.values()
            if role in ['admin', 'superadmin']:
                result, code = func(request, *args, **kwargs)
                return result, code
            return {"msg": "not authorized"}, 401
        return inner
    if func:
        return decorator(func)
    return decorator

def pagination_decorator(func=None):
    def decorator(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            print("------------ Paginator --------------")
            alldata, serializer, type = func(request, *args, **kwargs)
            if not alldata: return {'data': [], 'max_pages': 0}, 200
            try:
                return alldata['msg'], 400
            except:
                pass
            # default pageno and pagesize
            pageno, page_size = 1, 10
            if(params := request.query_params):
                pageno, page_size = list(map(int, params.values()))
                if pageno <= 0 or page_size <= 0: return {"msg": "invalid page number or page size"}, 400
                total = len(alldata)
                expected_pagenumbers = math.ceil(total/page_size)
                _debuger(f'Max page numbers: {expected_pagenumbers} requested page no: {pageno} Pageno check')
                if pageno > expected_pagenumbers: return {"msg": "Page contains no result"}, 400

            paginator = Paginator(alldata, page_size)
            page = paginator.page(pageno)
            ser = serializer(page, many=True)
            result = ser.data
            print(result, "------")
            if type == "users":
                result = [{**obj, "company": obj['company']['name']} for obj in ser.data]
            return {'data': result, 'max_pages':expected_pagenumbers}, 200
        return inner
    
    if func:
        return decorator(func)
    return decorator