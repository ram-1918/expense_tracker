from django.http import JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status, generics, mixins
from django.utils.decorators import method_decorator
# pip3 install django-filter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

from .models import AuthorizedUsers, Company, Users
from .serializers import GetUserSerializer, PostUserSerializer, CompanySerializer

from Expenses.models import Expenses

from .services import HandleService

from .authentication import login_required, admin_required, pagination_decorator, GlobalAccess, decode_uuid, get_access_token, get_refresh_token, _debuger

from django.forms import ValidationError
from django.utils.dateparse import parse_date
from django.db.models import Sum, Avg, Max, Min

import json
import os
import bcrypt
import time
import logging

# https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html
# mypy, autopep8
# Create your views here.

logger = logging.basicConfig(filename='mylog.log')
logger = logging.getLogger(__name__)


def testing(request):
    return Response('Users app')

def decodeddata():
    globalobj = GlobalAccess()
    return globalobj.data

def get_hashed_password(plain_password):
    return bcrypt.hashpw(plain_password, bcrypt.gensalt(12))

def check_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password, hashed_password)

def processFormData(data):
    newData = {}
    for k, v in dict(data).items():
        newData[k] = v[0]
    return newData

def apply_filters(users, filters):
    if role := filters.get('role', None): 
        users = users.filter(role=role.lower())

    if company := filters.get('company', None): 
        users = users.filter(company__name=company.lower().strip()) 

    if isactive := filters.get('isactive', None):
        activestatus = {'active': True, 'inactive': False}
        users = users.filter(is_active = activestatus[isactive])

    if isauthorized := filters.get('isauthorized', None): 
        authorizedStatus = {'authorized': True, 'unauthorized': False}
        users = users.filter(authorized = authorizedStatus[isauthorized])

    if (fromdate := filters.get('fromdate', None))  and (todate := filters.get('todate', None)): 
        fromdate = parse_date(fromdate)
        todate = parse_date(todate)
        users = users.filter(created_at__range=[fromdate, todate])
        print(users)

    if fullname := filters.get('fullname', None): 
        users = users.order_by(fullname)
    
    return users

# PROTECTED - list users, action by superadmin or admin
# ENDPOINT - /users/listusers/
@api_view(['POST'])
@login_required
@admin_required
@pagination_decorator
def getUsersView(request):
    filters = request.data['filters']
    userid, role, *others = decodeddata().values()
    adminuser = Users.objects.filter(id=decode_uuid(userid)).first()
    users = Users.objects.all().order_by('fullname')
    print(users)
    if role == 'admin':
        users = Users.objects.filter(company = adminuser.company).filter(role = 'employee').order_by('fullname')
    try:
        if filters:
            users = apply_filters(users, filters)
            print(filters, users)
        # if not users: return {"msg": "No users found"}, GetUserSerializer, "users"
    except:
        return {"msg": "error occured in filters"}, GetUserSerializer, "users"
    return users, GetUserSerializer, "users"

# Register new user
# ENDPOINT - /users/register/
class PostUsersView(APIView):
    def post(self, request):
        '''
            {
                "email": str,
                "password": str,
                "fullname": str,
                "company": int,
                "comment": str,
                "proceedtorequest": bool
            }
        '''
        if Users.objects.filter(email=request.data['email'], authorized=True).exists():
            return Response({"msg": "already registered"}, status=status.HTTP_409_CONFLICT)

        if Users.objects.filter(email=request.data['email'], authorized=False).exists():
            return Response('alreadyrequested', status=status.HTTP_409_CONFLICT)

        result = {"msg": ""}
        proceedToRequest = request.data.get('proceedtorequest', None)

        if authorized_users_check := AuthorizedUsers.objects.filter(email=request.data['email']).first():
            request.data = {**request.data, 
                            "role": authorized_users_check.role,
                            "employee_id": authorized_users_check.employeeid, 
                            "authorized": True
                            }
            result = {"msg": "created"}

        elif not authorized_users_check and proceedToRequest:
            # if not authorized, then create a record in requests table and send an email
            request.data['comment'] = request.data['comment'].strip()
            result = {"msg": "requestsent"}

        else:
            return Response({"msg": "unauthorized"}, status=status.HTTP_400_BAD_REQUEST)

        ser = PostUserSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()

        return Response(result, status=status.HTTP_201_CREATED)


# PROTECTED - Retrieve and update an user info
# ENDPOINT - /users/user/<uuid:pk>
class GetAndUpdateUserView(APIView):
    @login_required
    def get(self, request, pk) -> dict[str, int]:
        user = Users.objects.filter(id=pk)
        if not user.exists():
            return {"msg": "user not found"}, 204
        userinfo = GetUserSerializer(user.first())
        return userinfo.data, 200
    
    @login_required
    def patch(self, request, pk) -> dict:
        '''
        Receives form data from the UI
        {
            "email": ['email'],
            ...
        }
        '''
        handleObj = HandleService()
        user = Users.objects.filter(id=pk)
        if not user.exists(): return {"msg": "User not found"}, 404

        
        # Change authorized status of the user
        if authorized := request.data.get('authorized', None):
            print(authorized)
            if authorized == "accept":
                user.update(authorized = True)
            elif authorized == 'reject':
                try:
                    user.delete()
                except:
                    return {"msg": "no user found"}, 409
            # return {"msg": "status changed"}, 201
    
        # data = processFormData(request.data)
        data = request.data
        # update user's password
        if password := data.get('password', None):
            handledpassword, status = handleObj.handler('password', password)
            if not status:
                return handledpassword, 400
            hashpass = get_hashed_password(handledpassword)
            user.update(password=hashpass)
            return {"msg": "password updated"}, 201
        
        # update user's email
        if email := data.get('email', None):
            handledemail, status = handleObj.handler('email', email)
            if not status:
                return handledemail, 400
            user.update(email=handledemail)
            return {"msg": "email updated"}, 201
        
        # update user's phone
        if phone := data.get('phone', None):
            handledphone, status = handleObj.handler('phone', phone)
            if not status:
                return {"msg": "password updated"}, 400
            data['phone'] = handledphone
        
        companyobj = Company.objects.filter(name = data['company']).first()
        try:
            data['company'] = companyobj.id
            user.update(**data)
        except Exception as e:
            return {"msg": "error while updating"+str(e)}, 400
        time.sleep(2)
        return {"msg": "data updated"}, 201


# PROTECTED - delete user, action by superadmin or admin
# ENDPOINT - /users/deleteuserbyadmin/
@api_view(['POST'])
@login_required
@admin_required
def deleteuserbyadmin(request):
    userid = request.data['userid']
    if user := Users.objects.filter(id=userid).first():
        user.delete()
        return {"msg": "deleted succussfully"}, 201
    return {"msg": "user not found"}, 204



# Login and authentication
# ENDPOINT - /users/login/
class LoginAPI(APIView):
    def authenticate(self, request):
        handleobj = HandleService()
        email, status = handleobj.handleEmail(request.data['email'])
        password = request.data['password']
        if not status:
            return {"msg": 'Enter a valid email address.'}
        user = Users.objects.filter(email=email).first()
        if user:
            if user.is_active:
                h_password = user.password
                if check_password(password, h_password):
                    access = get_access_token(user)
                    refresh = get_refresh_token(user)
                    print("ACCESS ", access, "REFRESH ", refresh)
                    return user, access, refresh
                # {"msg": 'Incorrect password.'} #
                return Response('Incorrect password.', status=status.HTTP_401_UNAUTHORIZED)
            # {"msg": 'notactive'} #
            return Response('notactive', status=status.HTTP_403_FORBIDDEN)
        # {"msg": 'No user with this email address.'}
        return Response('No user with this email address.', status=status.HTTP_401_UNAUTHORIZED)

    # If authenticated, setup generated token inside httponly cookies
    def post(self, request):
        user, access, refresh = self.authenticate(request)
        data = {"id": str(user.id), "role": user.role,
                "fullname": user.fullname.title()}
        # set JWT into cookies
        response = Response(data, status=status.HTTP_201_CREATED)
        response.set_cookie(key='refresh', value=refresh, path='/',
                            httponly=True, samesite='Lax')  # storing refresh
        response.set_cookie(key='access', value=access, path='/',
                            httponly=True, samesite='Lax')  # storing access
        return response


# ENDPOINT - /users/logout/
@api_view(['GET'])
def logout(request):
    print("DELETE", request.COOKIES)
    response = Response({"msg": "logged out"})
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response, 


# ENDPOINT - /users/registrationrequests/
@api_view(['GET'])
@login_required
@admin_required
def get_registration_requests(request):
    decoded_data = decodeddata()
    role = decoded_data.get('role', None)
    company = decoded_data.get('company', None)
    users = Users.objects.filter(authorized = False)
    if role == 'admin':
        users = users.filter(role = "employee", company=company)
    filteredUsers = GetUserSerializer(users, many=True)
    result = [{**obj, 'company': obj['company']['name']} for obj in filteredUsers.data]
    return result, 200

# ENDPOINT - /users/list/
@api_view(['GET'])
@login_required
@admin_required
def list_companies(request):
    decoded_data = decodeddata()
    role = decoded_data.get('role', None)
    company = decoded_data.get('company', None)
    if role == 'superadmin':
        companies = Company.objects.all()
    else:
        companies = Company.objects.filter(id=company)
    serializer = CompanySerializer(companies)
    return serializer.data, 200
    
# ENDPOINT - /users/list/<company>
@api_view(['GET'])
@login_required
@admin_required
def get_users_by_company(request, company):
    role = decodeddata().get('role', None)
    users = Users.objects.filter(company=company)
    if role == 'admin':
        users = users.filter(role = "employee")
    serializer = GetUserSerializer(users, many=True)
    return serializer.data, 200


# --------------- Dashboard related ----------------

# Admin summary
@api_view(['GET'])
@login_required
@admin_required
def summaries_for_dashboard(request) -> dict:
    logger.info("This is an info message.")
    result = {
        'total_registration_requests': '',
        'total_expense_requests': '',
        'sum_of_submitted_expenses': [],
        'sum_of_pending_expenses': [],
        'sum_of_reembersements': '',
    }
    expenses = Expenses.objects.all()
    users = Users.objects.all()

    # total registration requests - Users - who is not authorized - SA only
    regi_requests = users.filter(authorized=False).count()
    result['total_registration_requests'] = regi_requests

    # total expense requests - Expeneses - whose expense status is False
    expense_requests = expenses.filter(status='pending').count()
    result['total_expense_requests'] = expense_requests

    # total sum of the amounts of the submitted expenses - Expenses - whose expense status is True
    sum_of_submitted = expenses.filter(status='approved')
    sum_ = sum_of_submitted.aggregate(Sum('amount'))['amount__sum']
    result['sum_of_submitted_expenses'] = [float(round(sum_, 2)) if sum_ is not None else 0, sum_of_submitted.count()]

    # total sum of the amounts of the submitted expenses - Expenses - whose expense status is False
    sum_of_pending = expenses.filter(status='pending')
    sum_ = sum_of_pending.aggregate(Sum('amount'))['amount__sum']
    result['sum_of_pending_expenses'] = [float(round(sum_, 2)) if sum_ is not None  else 0, sum_of_pending.count()]

    # total sum of the amounts of the submitted expenses - Expenses - whose payment method is CASH
    sum_of_reembersements = expenses.filter(status='approved', payment_method='cash')
    sum_ = sum_of_reembersements.aggregate(Sum('amount'))['amount__sum']
    result['sum_of_reembersements'] = [float(round(sum_, 2)) if sum_ is not None  else 0, sum_of_reembersements.count()]

    result = json.dumps(result)
    return result, 200




'''
# registeration
{
    "email":"ramubhai203@siriinfo.com",
    "password": "Preetu@19",
    "fullname":"Ramubhai",
    "company": 10,
    "comment": "This is Krishan, my email id has been changed, this is my updated email. please approve my registration, thank you",
    "proceedtorequest": true
}
# Login
{
    "email": "ramchandra.b@gmail.com",
    "password": "12345S@"
}

'''
