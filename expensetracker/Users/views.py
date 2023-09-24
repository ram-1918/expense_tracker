from django.http import JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status, generics, mixins
from django.utils.decorators import method_decorator
from django_filters.rest_framework import DjangoFilterBackend # pip3 install django-filter
from rest_framework.pagination import PageNumberPagination

from .models import AuthorizedUsers, Company, Users
from .serializers import SerializerMapper, UserSerializer, ListUserSerializer

from .services import HandleService

from .authentication import login_required, GlobalAccess, decode_uuid, get_access_token, get_refresh_token

import json
import os
import bcrypt
import time

# Create your views here.

def testing(request):
    return Response('Users app')

def decodeddata():
    globalobj = GlobalAccess()
    return globalobj.data

def check_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password, hashed_password)

@api_view(['GET'])
@login_required
def view_users(request):
    decoded = decodeddata()
    id = decode_uuid(decoded['sub'])
    user = Users.objects.filter(id=id).first()
    serializer = UserSerializer(user)
    return serializer.data

def modelObjectToDict(obj):
    return obj.__dict__

def getImage(image):
    defaultimg = os.path.join('http://127.0.0.1:8000/ExpenseMedia/', 'profilepics/default.png')
    imageurl = os.path.join('http://127.0.0.1:8000/ExpenseMedia/', image)
    return imageurl if image else defaultimg

def processFormData(data):
    newData = {}
    for k,v in dict(data).items():
        newData[k] = v[0]
    return newData

class RegisterAPI(APIView):    
    def post(self, request):
        # data = request.data.__dict__ 
        print(request.data['email'], "EMAIL")
        proceedToRequest = request.data.pop('proceedtorequest')
        if not request.data['phone']: request.data.pop('phone')
        serializer = SerializerMapper()
        data = serializer.mapSerializer('postuser', request.data)
        print(data, 'INITINALLY')
        # replace with instance of the company object
        data['company'] = Company.objects.filter(id=request.data['company']).first()
        # check if the user is in authorized list of users
        print('After Company')
        authorized_users_check = AuthorizedUsers.objects.filter(email=data['email']).first()
        # Differntiate between admin and superadmins while user creation - create_admin, create_superadmin
        print('After Check', authorized_users_check, proceedToRequest)
        if authorized_users_check:
            data['email'] = authorized_users_check.email
            data['role'] = authorized_users_check.role
            data['employee_id'] = authorized_users_check.employeeid
            data['image'] = 'profilepics/default.png'
            try: Users.objects.create_user(**data) # once created send an email
            except: return Response('user creation error', status=status.HTTP_409_CONFLICT)
            return Response('created', status=status.HTTP_201_CREATED)
        
        elif not authorized_users_check and not proceedToRequest:
            return Response('unauthorized', status=status.HTTP_400_BAD_REQUEST)
        
        elif not authorized_users_check and proceedToRequest:
            # if not authorized, then create a record in requests table and send an email
            print('inside UNAUTH')
            already_requested_check = Users.objects.filter(email=data['email'], authorized=False)
            if already_requested_check: 
                return Response('alreadyrequested', status=status.HTTP_409_CONFLICT)
            
            print('After No clash')
            data['comment'] = data['comment'].strip()
            data['image'] = 'profilepics/default.png'
            print(data, "unauth + workedout")
            try: 
                Users.objects.create_user(**data)
            except: 
                return Response('usercreationerror', status=status.HTTP_400_BAD_REQUEST)
            return Response('requestsent', status=status.HTTP_201_CREATED)

    def patch(self, request, pk):
        user = Users.objects.filter(id=pk).first()
        if request.data['authorized']:
            user.authorized = True
            user.save()
            return Response('approved', status=status.HTTP_201_CREATED)
        try:user.delete() # if status if false, just delete the record
        except: Response('invaliduser', status=status.HTTP_409_CONFLICT)
        return Response('rejected', status=status.HTTP_200_OK)

# # PROTECTED - list of users with filters
# @api_view(['GET'])
# @login_required
# def list_users(request):
#     decoded = decodeddata()
#     id = decode_uuid(decoded['sub'])
#     user = Users.objects.filter(id=id).first()  

#     if user.role in ['superadmin', 'admin']:
#         params = request.query_params      
#         if params:
#             if 'ordering' in params.keys():
#                 print(params.get('ordering'), 'ORDERING')
#                 users = Users.objects.all().order_by(params.get('ordering'))
#             else:
#                 filter_dic = {}
#                 for key in params.keys(): filter_dic[key] = params.get(key)
#                 users = Users.objects.filter(**filter_dic)
#         else:
#             if user.role == 'admin':
#                 users = Users.objects.filter(company=user.company).exclude(id=id)
#             else:
#                 users = Users.objects.all()
#         ser = ListUserSerializer(users, many=True)
#         return {"data": ser.data, "count":len(ser.data)}
#     return {"msg": 'unauthorized'} # Response('Notvalid')
    


# PROTECTED - Single user info and update
class UserAPI(APIView):
    @login_required
    def get(self, request, pk):
        user = Users.objects.get(id=pk)
        if user:
            data = modelObjectToDict(user)
            filteredData = {}
            for k,v in data.items():
                if k in ['fullname', 'email', 'phone', 'password', 'employee_id', 'company_id', 'image', 'role']:
                    filteredData[k] = v
            filteredData['image'] = getImage(filteredData['image'])
            return filteredData
        return Response('nouser', status=status.HTTP_400_BAD_REQUEST)
    
    @login_required
    def patch(self, request, pk):
        handleObj = HandleService()
        user = Users.objects.filter(id=pk).first()
        data = processFormData(request.data)
        print(data,"PATCH")
        emailChange = data['emailchange']
        passwordChange = data['passwordchange']
        if 'image' in data and not data['image']: data.pop('image')
        if data['phone']:
            phone = handleObj.handler('phone', data['phone'])
            if phone: data['phone'] = phone
            else: return Response('invalidphonenumber',  status=status.HTTP_400_BAD_REQUEST)
        else:
            data.pop('phone')

        if emailChange == 'true':
            # check and upadate with out clashes
            email = handleObj.handler('email', data['email'])
            userCheck = Users.objects.filter(email=email).first()
            if userCheck and not userCheck.email == email:
                return Response({"msg":"alreadyexists"}, status=status.HTTP_409_CONFLICT)
            else:
                data['email'] = email

        if passwordChange == 'true':
            password = data['password']
            if not user.check_password(password): # checking new password against old password
                user.set_password(password) 
                user.save()
                return {"msg": "passwordupdated"}
            return Response({"msg": "sameasprevious"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(user, data = data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data


@api_view(['POST'])
@login_required
def get_single_user(request):
    print(request.data)
    user = Users.objects.filter(id=request.data['userid']).first()
    ser = ListUserSerializer(user)
    return ser.data

@api_view(['PUT'])
@login_required
def update_user_by_admin(request):
    print(request.data, 'UPDATE USER')
    decoded = decodeddata()
    id = decode_uuid(decoded['sub'])
    user = Users.objects.filter(id=id).first()
    if user and user.role == "superadmin":
        employee = Users.objects.filter(id=request.data['id']).first()
        if not employee: return {"msg": "error occured"}
        ser = UserSerializer(employee, data = request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        time.sleep(5)
        return {"msg": "updated succussfully"}
    return {"msg": "not authorized"}

@api_view(['POST'])
@login_required
def deleteuserbyadmin(request):
    print(request.data)
    decoded = decodeddata()
    id = decode_uuid(decoded['sub'])
    user = Users.objects.filter(id=id).first()
    if user and user.role == "superadmin":
        userid = request.data['userid']
        user = Users.objects.filter(id=userid).first()
        user.delete()
        return {"msg": "deleted succussfully"}
    return {"msg": "Not Authorized"}

@api_view(['POST'])
@login_required
def change_registration_request_status(request):
    status = request.data['status']
    userid = request.data['userid']
    print(status, userid, "DATA FOR REQUETS CHANGE")
    user = Users.objects.filter(id=userid).first()
    if status == 'accept': 
        user.authorized = True
        user.save()
        return {"msg" : "accepted"}
    elif status == 'reject': 
        user.delete()
        return {"msg": "rejected"}
    return {"msg" : "Invalid input"}




# Login and authentication
class LoginAPI(APIView):
    def authenticate(self, request):
        handleobj = HandleService()
        email = handleobj.handleEmail(request.data['email'])
        password = request.data['password']
        if not email: return {"msg": 'Enter a valid email address.'} # Response("Enter a valid email address.", status=status.HTTP_401_UNAUTHORIZED)
        user = Users.objects.filter(email=email).first()
        if user:
            if user.is_active:
                h_password = user.password
                if check_password(password, h_password):
                    access = get_access_token(user)
                    refresh = get_refresh_token(user)
                    print("ACCESS ", access, "REFRESH ", refresh)
                    return user, access, refresh
                return Response('Incorrect password.', status=status.HTTP_401_UNAUTHORIZED) # {"msg": 'Incorrect password.'} # 
            return Response('notactive', status=status.HTTP_403_FORBIDDEN) # {"msg": 'notactive'} # 
        return Response('No user with this email address.', status=status.HTTP_401_UNAUTHORIZED) # {"msg": 'No user with this email address.'} 
    
    # If authenticated, setup generated token inside httponly cookies
    def post(self, request):
        user, access, refresh = self.authenticate(request)
        data = {"id":str(user.id), "role":user.role, "fullname": user.fullname.title()}
        # set JWT into cookies
        response = Response(data, status=status.HTTP_201_CREATED)
        response.set_cookie(key='refresh', value=refresh, path='/', httponly=True, samesite='Lax') # storing refresh
        response.set_cookie(key='access', value=access, path='/', httponly=True, samesite='Lax') # storing access
        return response

@api_view(['GET'])
def logout(request):
    print("DELETE", request.COOKIES)
    response = Response({"status":True})
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response

'''
# registering superadmin
{
    "email":"preetu.b@gmail.com",
    "phone":"1234567845",
    "password": "12345S@",
    "fullname":"preetu",
    "company": 1,
    "employee_id": "001734",
    "is_superadmin": false,
    "is_admin": true,
    "is_employee": false
}
# registering admin
{
    "email":"krishna.y@gmail.com",
    "phone":"1234567845",
    "password": "12345S@",
    "fullname":"krishna ",
    "company": "cloud5",
    "employee_id": "00234",
    "is_staff": true,
    "superadmin": "Srinivas Y"
}
# registering user
{
    "email":"krishna.y@gmail.com",
    "phone":"1234567845",
    "password": "12345S@",
    "fullname":"krishna ",
    "company": "cloud5",
    "employee_id": "00234"
}

'''
