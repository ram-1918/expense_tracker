from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import generics, status

from .models import AuthorizedUsers, Company, Users, RegisterationRequests
from .serializers import SerializerMapper, UserSerializer

from .readonlyserializers import RO_UserSerializer, RO_CompanySerializer

from .services import HandleService, AuthenticationService
from functools import wraps
from .views import validate_token, decode_uuid

import jwt 
import json
import os
import logging
from django.conf import settings


def decorator(func):
     def inner(request):
        response = validate_token(request)
        token = response.data
        if token['status']:
            print('ran successfully')
            func()
            response.data = "success"
            return response
        return Response(status=status.HTTP_401_UNAUTHORIZED)
     return inner

def session_login_required(function=None):
    def decorator(view_func):
        @wraps(view_func)
        def f(request, *args, **kwargs):
            token = validate_token(request)
            print(token)
            if token['status']:
                print("IN")
                global decoded_data
                decoded_data = token['data']
                access, refresh = token['access'], token['refresh']
                data = view_func(request, *args, **kwargs)
                response = Response({"msg": "authorized"}, status=status.HTTP_200_OK)
                response.set_cookie('access', access)
                response.set_cookie('refresh', refresh)
                response.data = data
                return response
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return f
    if function is not None:
        return decorator(function)
    return decorator

@api_view(['GET'])
@session_login_required
def get_users(request):
    print(decoded_data)
    users = Users.objects.all()
    serializer = RO_UserSerializer(users, many=True)
    return serializer.data

# @api_view(['GET'])
# def get_users(request):
#     response = validate_token(request)
#     token = response.data
#     if token['status']:
#         users = Users.objects.all()
#         serializer = RO_UserSerializer(users, many=True)
#         response.data = serializer.data
#         return response
#     return Response(status=status.HTTP_401_UNAUTHORIZED)

# @api_view(['GET'])
# def get_users(request):
#     response = validate_token(request)
#     token = response.data
#     if token['status']:
#         users = Users.objects.all()
#         serializer = RO_UserSerializer(users, many=True)
#         response.data = serializer.data
#         return response
#     return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@session_login_required
def get_companies(request):
    id = decode_uuid(decoded_data['sub'])
    role = decoded_data['role']
    if role == '1':
        print("SUPERADMIN")
        companies = Company.objects.all()
        serializer = RO_CompanySerializer(companies, many=True)
        return serializer.data
    elif role in ['2', '3']:
        user = Users.objects.filter(id=id).first()
        company = Company.objects.filter(id=user.company_id).first()
        print("ADMIN/EMPLYEE", company)
        serializer = RO_CompanySerializer(company)
        return serializer.data


@api_view(['GET'])
def get_users_by_company(request, role, company):
    if role in ['admin', 'superadmin']:
        users = Users.objects.filter(company=company)
        serializer = RO_UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)



'''
Optimize code if possible, create groups, Images upload(IMP)
request > each page (should retrieve id from URL) (create reusable code blocks(for retrieving params from URL) in react and django) > 
'''
    