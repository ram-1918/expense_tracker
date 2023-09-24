from rest_framework import serializers
from .models import Users, Company
import os


from .services import HandleService, AuthenticationService

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields=['id', 'name', 'location']

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Users
        fields =  '__all__' # ['id', 'email', 'fullname', 'role', 'authorized', 'phone', 'password', 'is_active', 'image', 'company']
    
    def validate_fullname(self, fullname):
        return fullname.lower()
    
    def validate_email(self, email):
        handleObj = HandleService()
        email = handleObj.handler('email', email)
        if not email: raise serializers.ValidationError('Enter a valid email address.')
        return email
    
    def validate_password(self, password):
        handleObj = HandleService()
        handledpassword = handleObj.handler('password', password)
        if password != handledpassword: #not password or password in ['symbol!', 'upper!', 'letternumber!', 'length!', 'firstchar']: 
            raise serializers.ValidationError(handledpassword)
        return password
    
    def validate_phone(self, phone):
        if not phone: return phone
        handleObj = HandleService()
        phone = handleObj.handler('phone', phone)
        if not phone: raise serializers.ValidationError('Enter a valid phone number.')
        return phone

class ListUserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Users
        fields = ['id', 'email', 'password', 'fullname', 'role', 'authorized', 'phone', 'is_active', 'image', 'company', 'colortag', 'get_date_created', 'get_last_modified', 'created_at'] # ['fullname', 'email', 'phone', 'image', 'role', 'company', 'employee_id']

# Factory pattern
class SerializerMapper():
    def mapSerializer(self, type, data):
        serializer = self.mapper(type)
        return serializer(data)
    
    def mapper(self, type):
        if type == 'postuser':
            return self.userSerializer
        elif type == 'listusers':
            return self.listUserSerializer
    
    def userSerializer(self, data):
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.data
    
    def listUserSerializer(self, data):
        serializer = ListUserSerializer(data, many=True)
        return serializer.data
    
    # def loginSerializer(self, data):
    #     serializer = LoginSerializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     return serializer.data