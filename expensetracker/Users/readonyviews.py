from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import generics, status

from .models import AuthorizedUsers, Company, Users, RegisterationRequests, Login
from .serializers import PostSerializerMapper, LoginSerializer, UserSerializer
from .readonlyserializers import RO_UserSerializer

from .services import HandleService, AuthenticationService

import jwt 
import json
import os
import logging
from django.conf import settings

@api_view(['GET'])
def get_users(request):
    users = Users.objects.all()
    serializer = RO_UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_users_by_company(request, company):
    users = Users.objects.filter(company=company)
    serializer = RO_UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

'''
Optimize code if possible, create groups, Images upload(IMP)
request > each page (should retrieve id from URL) (create reusable code blocks(for retrieving params from URL) in react and django) > 
'''
    