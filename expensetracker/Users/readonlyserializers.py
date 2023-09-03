from rest_framework import serializers
from .models import Users, Login, Company, RegisterationRequests
import os


from .services import HandleService, AuthenticationService

class RO_UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'fullname', 'email', 'phone', 'company', 'employee_id']

class RO_CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'location']