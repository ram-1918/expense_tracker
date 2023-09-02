from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .models import AuthorizedUsers, Company, Users, RegisterationRequests, Login
from .serializers import PostSerializerMapper, LoginSerializer, UserSerializer

from .services import HandleService, AuthenticationService

import jwt 
import json
import os
import logging
from django.conf import settings

# Create your views here.

def testing(request):
    return HttpResponse('Users app')

def modelObjectToDict(obj):
    return obj.__dict__

def checkAndGetUser(field, value):
    if field == 'email':
        user = Users.objects.filter(email=value).first()
    elif field == 'id':
        user - Users.objects.filter(id=value).first()
    return user

class RegisterAPI(APIView):

    def get(self, request):
        # for admins - it returns list of all the users under him
        # for superadmins - it returns list of all the admins and users under him
        param = request.GET.get('id')
        print(param, 'fewbbk')
        userRoleCheck = Users.objects.filter(id=param).first()
        roleCheck = "superadmin" if userRoleCheck.is_superadmin else "admin" if userRoleCheck.is_admin else "employee"
        if userRoleCheck and roleCheck in ['admin', ['superadmin']]:
            users = Users.objects.all()
            result = []
            for user in users:
                eachUser = {}
                role = "superadmin" if user.is_superadmin else "admin" if user.is_admin else "employee"
                eachUser['id'] = user.id
                eachUser['fullname'] = user.fullname
                eachUser['email'] = user.email
                eachUser['phone'] = user.phone
                eachUser['active'] = user.is_active
                eachUser['role'] = role
                eachUser['company'] = user.company.id
                eachUser['employeeid'] = user.employee_id
                result.append(eachUser)
            # print(result)
            return Response(result, status=status.HTTP_200_OK)
        return Response('invalidrequest', status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        proceedToRequest = request.data.pop('proceedtorequest')
        serializer = PostSerializerMapper()
        data = serializer.mapSerializer('user', request.data)
        data.pop('last_login')
        # replaced with instance of the company object
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
                return Response('alreadyrequested', status=status.HTTP_409_CONFLICT)
            data['comment'] = request.data['comment'].strip()
            print(data, "unauth + workedout")
            data.pop('image')
            try: RegisterationRequests.objects.create_user(**data)
            except: return Response('usercreationerror', status=status.HTTP_400_BAD_REQUEST)
            return Response('requestsent', status=status.HTTP_201_CREATED)

class ApproveRequest(APIView):
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
            try: 
                user = Users(**convertedObj) # once created send an email
                user.save()
                requestObj.delete()
            except: return Response('user creation error', status=status.HTTP_400_BAD_REQUEST)
            return Response('approved', status=status.HTTP_201_CREATED)
        # if status if false, just delete the record
        requestObj.delete()
        return Response('rejected', status=status.HTTP_200_OK)

class UpdateAPI(APIView):
    def get(self, request, pk):
        # returns the details of individual user, while updateprofile
        user = Users.objects.get(id=pk)
        if user:
            data = modelObjectToDict(user)
            filteredData = {}
            for k,v in data.items():
                if k in ['fullname', 'email', 'phone', 'password', 'employee_id', 'company_id', 'image']:
                    filteredData[k] = v
            role = "superadmin" if user.is_superadmin else "admin" if user.is_admin else "employee"
            filteredData['role'] = role
            imageurl = filteredData["image"]
            filteredData['image'] = os.path.join('http://127.0.0.1:8000/ExpenseMedia/', imageurl)
            print(filteredData['image'])
            return Response(filteredData, status=status.HTTP_200_OK)
        return Response('nouser', status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        handleObj = HandleService()
        print(request.FILES.get('image'), '_+++++++++_+_+__--____-_---_-__')
        emailChange = request.data.pop('emailchange')
        passwordChange = request.data.pop('passwordchange')

        if emailChange == True:
            # check and upadate with out clashes
            email = handleObj.handler('email', request.data['email'])
            userCheck = checkAndGetUser('email', email)
            if userCheck and not userCheck.email == email:
                return Response('already exists', status=status.HTTP_400_BAD_REQUEST)
            request.data['email'] = email

        user = Users.objects.filter(id=pk).first()
        if passwordChange == True:
            password = request.data['password']
            user.set_password(password)
            user.save()
            return Response('Password updated')
        
        # phone = handleObj.handler('phone', request.data['phone']) if request.data['phone'] else ''
        # if phone: request.data['phone'] = phone
        # else: return Response('invalidphonenumber',  status=status.HTTP_400_BAD_REQUEST)
        print(request.data)
        # request.data['image'] = os.path.join('http://127.0.0.1:8000/ExpenseMedia/', request.data['image'])
        serializer = UserSerializer(user, data = request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data, 'serialzied')
        print("after saving")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class LoginAPI(APIView):
    def post(self, request):
        handleobj = HandleService()
        email = handleobj.handleEmail(request.data['email'])
        if not email: return Response("Enter a valid email address.", status=status.HTTP_401_UNAUTHORIZED)
        password = request.data['password']
        user = Users.objects.filter(email=email).first()
        if user:
            role = "superadmin" if user.is_superadmin else "admin" if user.is_admin else "employee"
            authObj = AuthenticationService()
            token = authObj.handler('auth', {"user":user, "email":email, "password":password})
            if token:
                loggedinuser = Login.objects.filter(email=email).first()
                if loggedinuser:
                    loggedinuser.token = token
                else:
                    loggedinuser = LoginSerializer(data={"userid": user.id, "email":email, "token": token })
                    loggedinuser.is_valid(raise_exception=True)
                loggedinuser.save()
                data = {"userid":str(user.id), "role":role, "username": user.fullname.title()}
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