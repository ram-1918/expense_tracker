from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .models import Users, Login
from .serializers import UserSerializers, LoginSerializer

from .services import HandleService, AuthenticationService

# Create your views here.

def testing(request):
    return HttpResponse('Users app')




class RegisterAPI(APIView):
    def get(self, request):
        return Response("Get HTTP", status=status.HTTP_200_OK)
    
    def post(self, request):
        userdata = request.data
        serializer = UserSerializers(data=userdata)
        serializer.is_valid(raise_exception=True)
        print("data is serialized and validated against custom conditions!!!")
        user = Users.objects.filter(email=serializer.data['email'], phone=serializer.data['phone'])
        if not user:
            print(f'There is no user with this email, so lets create one!!!')
            Users.objects.create_user(
                email=serializer.data['email'], 
                password=serializer.data['password'], 
                phone=serializer.data['phone'],
                firstname=userdata['firstname'].strip().lower(), 
                lastname=userdata['lastname'].strip().lower())
            return Response('created', status=status.HTTP_201_CREATED)        
        return Response('exists', status=status.HTTP_409_CONFLICT)        

class UpdateAPI(APIView):
    def get(self, request, pk):
        return Response("Get HTTP")
    
    def put(self, request, pk):
        print(pk)
        return Response("Post HTTP")
    
class LoginAPI(APIView):
    def post(self, request):
        handleobj = HandleService()
        email = handleobj.handleEmail(request.data['email'])
        if not email: return Response("Enter a valid email address.", status=status.HTTP_401_UNAUTHORIZED)
        password = request.data['password']
        user = Users.objects.filter(email=email).first()
        if user:
            authobj = AuthenticationService()
            token = authobj.handler('auth', {"user":user, "email":email, "password":password})
            if token:
                # print(f'{token} inside loginAPI')
                loggedinuser = Login.objects.filter(email=email).first()
                if loggedinuser:
                    loggedinuser.token = token
                else:
                    loggedinuser = LoginSerializer(data={"email":email, "token": token })
                    loggedinuser.is_valid(raise_exception=True)
                loggedinuser.save()
                response = HttpResponse(status=status.HTTP_201_CREATED)
                response.set_cookie('jwt', token, httponly=True)
                return response
            return Response('Incorrect password.', status=status.HTTP_401_UNAUTHORIZED)
        return Response('No user with this email address.', status=status.HTTP_401_UNAUTHORIZED)

