from django.shortcuts import render
from django.shortcuts import HttpResponse

from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import generics

from .models import Users, Login
from .serializers import UserSerializers, LoginSerializer

from .services import HandleService, AuthenticationService

# Create your views here.

def testing(request):
    return HttpResponse('Users app')




class RegisterAPI(APIView):
    def get(self, request):
        return Response("Get HTTP")
    
    def post(self, request):
        userdata = request.data
        serializer = UserSerializers(data=userdata)
        serializer.is_valid(raise_exception=True)
        print("data is serialized and validated against custom conditions!!!")
        # user = Users.objects.filter(email=serializer.data['email'], phone=serializer.data['phone'])
        # if not user:
        #     print(f'There is no user with this email, so lets create one!!!')
        #     Users.objects.create_user(
        #         email=serializer.data['email'], 
        #         password=serializer.data['password'], 
        #         phone=serializer.data['phone'],
        #         firstname=userdata['firstname'].strip().lower(), 
        #         lastname=userdata['lastname'].strip().lower())
        serializer.save()
        return Response('New User Created!')

    # def post(self, request):
    #     userdata = request.data
    #     serializer = UserSerializers(data=userdata)
    #     serializer.is_valid(raise_exception=True)
    #     print("data is serialized and validated against custom conditions!!!")
    #     user = Users.objects.filter(email=serializer.data['email'], phone=serializer.data['phone'])
    #     if not user:
    #         print(f'There is no user with this email, so lets create one!!!')
    #         Users.objects.create_user(
    #             email=serializer.data['email'], 
    #             password=serializer.data['password'], 
    #             phone=serializer.data['phone'],
    #             firstname=userdata['firstname'].strip().lower(), 
    #             lastname=userdata['lastname'].strip().lower())
    #         return Response('New User Created!')
    #     return Response("User already exists!")
        

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
        password = handleobj.handlePassword(request.data['password'])
        user = Users.objects.filter(email=email).first()
        if user:
            authobj = AuthenticationService()
            if authobj.handler('auth', {"user":user, "email":email, "password":password}):
                return Response(f'Verified')
            return Response('Password incorrect!')
        return Response('No user this email!!')

