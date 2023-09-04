from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication  import JWTAuthentication
# from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf

from .models import AuthorizedUsers, Company, Users, RegisterationRequests
from .serializers import SerializerMapper, UserSerializer

from .services import HandleService, AuthenticationService

from django.views.decorators.http import require_GET


import jwt 
import json
import os
import logging
import uuid
from django.conf import settings
from datetime import datetime, timedelta
from PIL import Image 
from functools import wraps

# Create your views here.

def testing(request):
    return Response('Users app')

# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

def get_access_token(user):
    expiry_days = datetime.now() + timedelta(minutes=15)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title()}
    payload['iat'] = datetime.now()
    payload['iss'] = 'etbackend'
    payload['exp'] = int(expiry_days.strftime('%s'))
    accesstoken = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
    print('Inside getaccess', expiry_days)
    return accesstoken

def get_refresh_token(user):
    expiry_days = datetime.now() + timedelta(minutes=120)
    payload = {'sub': str(user.id), 'role': user.role, 'name': user.fullname.title()}
    payload['iat'] = datetime.now()
    payload['iss'] = 'etbackend'
    payload['exp'] = int(expiry_days.strftime('%s'))
    refreshtoken = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
    return refreshtoken

def calc_time_left(exp_epoch):
    return datetime.fromtimestamp(exp_epoch) - datetime.now()

def decode_uuid(id):
    return uuid.UUID(id).hex # converts string to UUID


# def auth_decorator(func):
#     print("Outer func")
#     @wraps(func) # this ensures decorated function retains name and doc string
def validate_token(request):
    # response = Response()
    access = request.COOKIES.get('access')
    refresh = request.COOKIES.get('refresh')
    try:
        if access:
            decoded_token = jwt.decode(jwt=access, key=settings.SECRET_KEY, algorithms='HS256')
            timeleft = calc_time_left(decoded_token['exp'])
            print("Time left for access token", timeleft)
            # response = Response()
            # response.data = {'status': True, 'data': decoded_token}
            return {'status': True, 'data': decoded_token, 'access': access, 'refresh': refresh}
            # return response
        else:
            # response.data = {'status': False, 'data': ''}
            return {'status': False, 'data': '', 'access': access, 'refresh': refresh}
            # return response # Response(status=status.HTTP_401_UNAUTHORIZED)
    except:
        try:
            print(refresh, "REFRESH")
            if refresh:
                decoded_refresh = jwt.decode(jwt=refresh, key=settings.SECRET_KEY, algorithms='HS256')
                timeleft = calc_time_left(decoded_refresh['exp'])
                print("Time left for refresh token", timeleft)
                id = decode_uuid(decoded_refresh['sub'])
                user = Users.objects.filter(id=id).first()
                newaccess = get_access_token(user)
                print("NEW ACCES")
                # response = Response()
                # response.set_cookie('access', newaccess)
                # response.data = {'status': True, 'data': decoded_refresh, 'access': newaccess, 'refresh': refresh}
                return {'status': True, 'data': decoded_refresh, 'access': newaccess, 'refresh': refresh}
                # return func(request, *args, **kwargs)
                # return response
            else:
                # response.data = {'status': False, 'data': ''}
                # response.data = {'status': False, 'data': '', 'access': '', 'refresh': ''}
                return {'status': False, 'data': '', 'access': '', 'refresh': ''}
                # return response # Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            # response.data = {'status': False, 'data': ''}
            # return response #Response(status=status.HTTP_401_UNAUTHORIZED)
            return {'status': False, 'data': '', 'access': '', 'refresh': ''}
    # return validate_token

@api_view(['GET'])
def view_users(request):
    # data = validate_token(request)
    response = validate_token(request)
    token = response.data
    # isLoggedIn, user = validate_token(request)
    print(token.status, 'VIEW USERS')
    if token.status:
        id = uuid.UUID(token.data['sub']).hex
        print(id, "UUID")
        user = Users.objects.filter(id=id).first()
        serializer = UserSerializer(user)
        print(serializer.data, " FINAL DATA ")
        response.data = serializer.data
        return response
    return Response(status=status.HTTP_401_UNAUTHORIZED)



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
    # def get(self, request):
    #     # for admins - it returns list of all the users under him
    #     # for superadmins - it returns list of all the admins and users under him
    #     response = validate_token(request)
    #     decoded_token = response.data['data']
    #     isLoggedIn = response.data['status']
    #     print("GET", decoded_token, isLoggedIn)
    #     if isLoggedIn:
    #         id = decoded_token['sub']
    #         user = Users.objects.filter(id=id).first()
    #         if user and user.role == '1':
    #                 users = Users.objects.all()
    #                 serializer = SerializerMapper()
    #                 data = serializer.mapSerializer('listusers', users)
    #                 response.data = data
    #                 return response
    #         return Response('invaliduser', status=status.HTTP_204_NO_CONTENT)
    #     return Response('invalidtoken', status=status.HTTP_401_UNAUTHORIZED)
    
    def post(self, request):
        proceedToRequest = request.data.pop('proceedtorequest')
        serializer = SerializerMapper()
        data = serializer.mapSerializer('postuser', request.data)
        # replace with instance of the company object
        data['company'] = Company.objects.filter(id=data['company']).first()
        # check if the user is in authorized list of users
        authorized_users_check = AuthorizedUsers.objects.filter(email=data['email']).first()
        # Differntiate between admin and superadmins while user creation - create_admin, create_superadmin
        if authorized_users_check:
            data['email'] = authorized_users_check.email
            data['role'] = authorized_users_check.role
            data['employee_id'] = authorized_users_check.employeeid
            data['image'] = os.path('profilepics/default.png')
            try: Users.objects.create_user(**data) # once created send an email
            except: return Response('user creation error', status=status.HTTP_400_BAD_REQUEST)
            return Response('created', status=status.HTTP_201_CREATED)
        
        elif not authorized_users_check and not proceedToRequest:
            return Response('unauthorized', status=status.HTTP_400_BAD_REQUEST)
        
        elif not authorized_users_check and proceedToRequest:
            # if not authorized, then create a record in requests table and send an email
            already_requested_check = RegisterationRequests.objects.filter(email=data['email'])
            if already_requested_check: 
                return Response('alreadyrequested', status=status.HTTP_409_CONFLICT)
            data['comment'] = request.data['comment'].strip()
            print(data, "unauth + workedout")
            data.pop('image')
            try: RegisterationRequests.objects.create_user(**data)
            except: return Response('usercreationerror', status=status.HTTP_400_BAD_REQUEST)
            return Response('requestsent', status=status.HTTP_201_CREATED)


class ApproveRequest(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.data)
        if request.data and request.data['role'] not in ['admin', 'superadmin']:
            return Response('Please login as admin to access requests', status=status.HTTP_406_NOT_ACCEPTABLE)
        allRequests = RegisterationRequests.objects.all()
        result = []
        for obj in allRequests:
            role = "superadmin" if obj.is_superadmin else "admin" if obj.is_admin else "employee"
            details = {
                "fullname":obj.fullname, 
                "email": obj.email, 
                "phone": obj.phone, 
                "role": role, 
                "company": obj.company.id, 
                "employeeid": obj.employee_id, 
                "comment": obj.comment
                }
            result.append(details)
        result = json.dumps(result)
        print(result, '----------------')
        return JsonResponse(result, safe=False)

    def post(self, request):
        requestObj = RegisterationRequests.objects.filter(email=request.data['email'])
        if request.data['status']:
            convertedObj = modelObjectToDict(requestObj.first())
            convertedObj.pop('_state')
            convertedObj.pop('comment')
            # convertedObj['image'] = ''
            print(convertedObj)
            # try: 
            user = Users(**convertedObj) # once created send an email
            user.save()
            requestObj.delete()
            # except: return Response('user creation error', status=status.HTTP_400_BAD_REQUEST)
            return Response('approved', status=status.HTTP_201_CREATED)
        # if status if false, just delete the record
        requestObj.delete()
        return Response('rejected', status=status.HTTP_200_OK)

# protected
class UserAPI(APIView):
    def get(self, request, pk):
        # returns the details of individual user, while updateprofile
        # decoded_token = handleToken(request)
        response = validate_token(request)
        token = response.data
        if token['status']:
            user = Users.objects.get(id=pk)
            if user:
                data = modelObjectToDict(user)
                filteredData = {}
                for k,v in data.items():
                    if k in ['fullname', 'email', 'phone', 'password', 'employee_id', 'company_id', 'image', 'role']:
                        filteredData[k] = v
                # filteredData['role'] = "superadmin" if user.is_superadmin else "admin" if user.is_admin else "employee"
                filteredData['image'] = getImage(filteredData['image'])
                response.data = filteredData
                return response
            return Response('nouser', status=status.HTTP_400_BAD_REQUEST)
        return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)
    
    def patch(self, request, pk):
        response = validate_token(request)
        token = response.data
        if token['status']:
            handleObj = HandleService()
            print("FORM DATA BEFORE ", request.data)
            user = Users.objects.filter(id=pk).first()
            data = processFormData(request.data)
            print("FORMDATA AFTER ", data)
            emailChange = data['emailchange']
            passwordChange = data['passwordchange']
            if 'image' in data and not data['image']: data.pop('image')
            if data['phone']:
                phone = handleObj.handler('phone', data['phone'])
                if phone: data['phone'] = phone
                else: return Response('invalidphonenumber',  status=status.HTTP_400_BAD_REQUEST)
            else:
                data.pop('phone')
            print("FINAL DATA TO SUBMIT ", data)

            if emailChange == 'true':
                # check and upadate with out clashes
                email = handleObj.handler('email', data['email'])
                userCheck = Users.objects.filter(email=email).first()
                if userCheck and not userCheck.email == email:
                    response.data = {"msg":"alreadyexists"}
                    return response
                else:
                    data['email'] = email

            if passwordChange == 'true':
                password = data['password']
                if not user.check_password(password): # checking new password against old password
                    user.set_password(password) 
                    user.save()
                    response.data = {"msg": "passwordupdated"}
                    return response
                return Response({"msg": "sameasprevious"}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = UserSerializer(user, data = data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            response.data = serializer.data
            return response
        return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    
class LoginAPI(APIView):
    def authenticate(self, request):
        handleobj = HandleService()
        email = handleobj.handleEmail(request.data['email'])
        password = request.data['password']
        if not email: return Response("Enter a valid email address.", status=status.HTTP_401_UNAUTHORIZED)
        user = Users.objects.filter(email=email).first()
        print("line 1")
        if user:
            if user.is_active:
                print("line 2")
                # authObj = AuthenticationService()
                # token = authObj.handler('auth', {"user":user, "email":email, "password":password})
                if user.check_password(password):
                    # payload = {"sub":str(user.id)}
                    # token = self.generateJWTToken(payload)
                    access = get_access_token(user)
                    refresh = get_refresh_token(user)
                    print("ACCESS ", access, "REFRESH ", refresh)
                    return user, access, refresh
                return Response('Incorrect password.', status=status.HTTP_401_UNAUTHORIZED)
            return Response('notactive', status=status.HTTP_403_FORBIDDEN)
        return Response('No user with this email address.', status=status.HTTP_401_UNAUTHORIZED)
    # If authenticated, setup generated token inside httponly cookies
    def post(self, request):
        user, access, refresh = self.authenticate(request)
        data = {"id":str(user.id), "role":user.role, "fullname": user.fullname.title()}
        print("line 4")
        # set JWT into cookies
        response = Response(data, status=status.HTTP_201_CREATED)
        print(refresh, "REFSRESF")
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



# class LogoutAPI(APIView):
#     def post(self, request):
#         print("DELETE", request.COOKIES)
#         response = Response({"message": "Logged out successfully", "status": True})
#         response.set_cookie('access', '')
#         response.set_cookie('refresh', '')
#         return response
        



        # print(request.data)
        # email = request.data['email']
        # handleObj = HandleService()
        # email = handleObj.handler('email', email)
        # if not email: return Response('Enter a valid email address.')        
        # if request.data['status'] == True:
        #     dataObj = RegisterationRequests.objects.filter(email=email).first()
        #     print(dataObj.__dict__, " dataobject")
        #     if dataObj:
        #         dataObj = dataObj.__dict__
        #         is_staff = True if 'is_staff' in dataObj and dataObj['is_staff'] == True else False
        #         superadmin = dataObj.superadmin if 'superadmin' in dataObj else None
        #         is_superuser = True if 'is_superuser' in dataObj and dataObj['is_superuser'] == True else False
        #         print('superuser and admins are set ', dataObj)
        #         company = Company.objects.filter(id=dataObj['company_id']).first()
        #         result = createUser(dataObj, company, is_staff, superadmin, is_superuser)
        #         print(result.data, "after creation")
        #         if result.data == 'created':
        #             try: RegisterationRequests.objects.filter(email=email).delete()
        #             except: return Response("Deleting request failed")
        #             return Response("Approved! email should be recieved")
        #     return Response("Invalid request")
        # val = RegisterationRequests.objects.filter(email=email).delete()
        # print(val, 'experimenting delete')


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
                # Users.objects.create_user(
                #     email=serializer.data['email'], 
                #     password=serializer.data['password'], 
                #     phone=serializer.data['phone'],
                #     firstname=serializer.data['firstname'].strip().lower(), 
                #     lastname=serializer.data['lastname'].strip().lower(),
                #     company = company,
                #     employee_id = serializer.data['employee_id']
                # )
                # name = serializer.data['firstname'] + serializer.data['lastname']
                # print("verified and created")
                # if 'is_superuser' in request.data:
                #     print('create superuser...')
                #     superadmins = SuperAdmins(name=name, empid=serializer.data['employee_id'])
                #     superadmins.save()
                #     print('superadmin created')
                # elif 'is_staff' in request.data:
                #     try:
                #         superadmin = SuperAdmins.objects.filter(name=request.data['superadmin']).first()
                #         admins = Admins(name=name, empid=serializer.data['employee_id'], is_employee=superadmin)
                #         admins.save()
                #         print('admin created')
                #     except:
                #         return Response('Superadmin not available', status=status.HTTP_400_BAD_REQUEST)
                # return Response('created', status=status.HTTP_201_CREATED)