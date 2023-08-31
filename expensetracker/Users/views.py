from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .models import AuthorizedUsers, Company, Users, RegisterationRequests, Login
from .serializers import PostSerializerMapper, LoginSerializer

from .services import HandleService, AuthenticationService

import jwt 
import json
import os
import logging
# Create your views here.

def testing(request):
    return HttpResponse('Users app')

def modelObjectToDict(obj):
    return obj.__dict__

class RegisterAPI(APIView):

    def get(self, request):
        # for admins - it returns list of all the users under him
        # for superadmins - it returns list of all the admins and users under him
        return Response("Get HTTP", status=status.HTTP_200_OK)
    
    def post(self, request):
        proceedToRequest = request.data.pop('proceedtorequest')
        serializer = PostSerializerMapper()
        data = serializer.mapSerializer('user', request.data)
        data.pop('last_login')
        print('serialized data', data)
        # replaced with instance of an object
        data['company'] = Company.objects.filter(id=data['company']).first()
        # check if the user is in authorized list of users
        authorized_users_check = AuthorizedUsers.objects.filter(email=data['email']).first()

        if authorized_users_check:
            try: Users.objects.create_user(**data) # once created send an email
            except: return Response('user creation error', status=status.HTTP_400_BAD_REQUEST)
            return Response('created', status=status.HTTP_201_CREATED)
        
        elif not authorized_users_check and not proceedToRequest:
            return Response('unauthorized', status=status.HTTP_400_BAD_REQUEST)
        
        elif not authorized_users_check and proceedToRequest:
            # if not authorized, then create a record in requests table and send an email
            already_requested_check = RegisterationRequests.objects.filter(email=data['email'])
            if already_requested_check: 
                return Response('Already Requested', status=status.HTTP_409_CONFLICT)
            requestedUser = RegisterationRequests(**data)
            requestedUser.save()
            return Response('Request sent', status=status.HTTP_201_CREATED)

class ApproveRequest(APIView):
    def post(self, request):
        requestObj = RegisterationRequests.objects.filter(email=request.data['email'])
        if request.data['status']:
            convertedObj = modelObjectToDict(requestObj.first())
            convertedObj.pop('_state')
            try: 
                Users.objects.create_user(**convertedObj) # once created send an email
                requestObj.delete()
            except: return Response('user creation error', status=status.HTTP_400_BAD_REQUEST)
            return Response('approved', status=status.HTTP_201_CREATED)
        # if status if false, just delete the record
        requestObj.delete()
        return Response('rejected', status=status.HTTP_200_OK)

class UpdateAPI(APIView):
    def get(self, request, pk):
        # returns the details of individual user, while updateprofile
        return Response("Get HTTP")
    
    def put(self, request, pk):
        # this is used to update the details of the user
        return Response("Post HTTP")
    
class LoginAPI(APIView):
    def post(self, request):
        handleobj = HandleService()
        email = handleobj.handleEmail(request.data['email'])
        if not email: return Response("Enter a valid email address.", status=status.HTTP_401_UNAUTHORIZED)
        password = request.data['password']
        user = Users.objects.filter(email=email).first()
        print(user, "login1")
        if user:
            roles = {"superadmin":user.is_superuser, "admin":user.is_staff, "employee":user.is_employee}
            role = ''
            for k,v in roles.items():
                if v:
                    role = k
                    break
            authobj = AuthenticationService()
            token = authobj.handler('auth', {"user":user, "email":email, "password":password})
            print(token, "  login2")
            if token:
                print(f'{token} inside loginAPI')
                loggedinuser = Login.objects.filter(email=email).first()
                if loggedinuser:
                    loggedinuser.token = token
                else:
                    loggedinuser = LoginSerializer(data={"userid": user.id, "email":email, "token": token })
                    loggedinuser.is_valid(raise_exception=True)
                loggedinuser.save()
                data = {"userid":str(user.id), "role":role, "username": user.firstname.title()+' '+user.lastname.title()}
                print("login3 ", user.id,data )
                response = HttpResponse(json.dumps(data), status=status.HTTP_201_CREATED)
                response.set_cookie('jwt', token, httponly=True)
                return response
            return Response('Incorrect password.', status=status.HTTP_401_UNAUTHORIZED)
        return Response('No user with this email address.', status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPI(APIView):
    def post(self, request):
        response = JsonResponse({"message": "Logged out successfully", "status": True})
        response.delete_cookie('jwt')  # Clear the JWT cookie
        try: 
            print(Login.objects.all(), request.data)
            print(request.data['id'])
            Login.objects.filter(userid=request.data['id']).first().delete()
        except: return Response('issue occured')
        return response
        



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
    "firstname":"preetu",
    "lastname":" B",
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
    "firstname":"krishna ",
    "lastname":" y",
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
    "firstname":"krishna ",
    "lastname":" y",
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