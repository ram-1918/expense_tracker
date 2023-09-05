import jwt, uuid, time
from datetime import datetime, timedelta
from functools import wraps
from django.conf import settings
from .models import Users
from rest_framework.response import Response
from rest_framework import status

class GlobalAccess():
    def __init__(self):
        self.data = decoded_data

def get_access_token(user):
    print('GENERATING ACCESS TOKEN: STARTED')
    expiry_days = datetime.now() + timedelta(minutes=15)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title()}
    payload['iat'] = datetime.now()
    payload['iss'] = 'etbackend'
    payload['exp'] = int(expiry_days.strftime('%s'))
    accesstoken = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
    print('GENERATING ACCESS TOKEN: ENDED')
    return accesstoken

def get_refresh_token(user):
    print('GENERATING REFRESH TOKEN: STARTED')
    expiry_days = datetime.now() + timedelta(minutes=120)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title()}
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
                data = view_func(request, *args, **kwargs)
                end = time.time()
                print("EXECTION: ENDED")
                print('TOTAL EXECUTION TIME: ', int(end-start))
                response = Response({"msg": "authorized"}, status=status.HTTP_200_OK)
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