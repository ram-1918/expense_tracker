from django.http import JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status

from .models import AuthorizedUsers, Company, Users, RegisterationRequests
from .serializers import SerializerMapper, UserSerializer

from .services import HandleService

from .authentication import login_required, GlobalAccess, decode_uuid, get_access_token, get_refresh_token

import json
import os
import bcrypt

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
            data['image'] = 'profilepics/default.png'
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
            RegisterationRequests.objects.create_user(**data)
            # sdata = UserSerializer(data=data)
            # sdata.is_valid(raise_exception=True)
            # print(sdata.data, 'DJHBHWJBFKJBKJF')
            try: 
                pass
                # RegisterationRequests.objects.create_user(**data)
                # register = RegisterationRequests(**data)
                # register.save()
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