from rest_framework import serializers
from .models import Users, Company
import os
from .services import HandleService, AuthenticationService
from .authentication import _debuger

import bcrypt

def get_hashed_password(plain_password):
    return bcrypt.hashpw(plain_password, bcrypt.gensalt(12))

def emailValidation(email):
    handleObj = HandleService()
    email, status = handleObj.handler('email', email)
    if not status: raise serializers.ValidationError('Enter a valid email address')
    return email

def passwordValidation(password):
    handleObj = HandleService()
    handledpassword, _ = handleObj.handler('password', password)
    if password != handledpassword: #not password or password in ['symbol!', 'upper!', 'letternumber!', 'length!', 'firstchar']: 
        raise serializers.ValidationError(handledpassword)
    return get_hashed_password(password)

def phoneValidation(phone):
    if not phone: return phone
    handleObj = HandleService()
    phone, status = handleObj.handler('phone', phone)
    if not status: raise serializers.ValidationError('Enter a valid phone number')
    return phone

def imageValidation(image):
    if image: return os.path.join('http://127.0.0.1:8000/ExpenseMedia/', image)
    return os.path.join('http://127.0.0.1:8000/ExpenseMedia/', 'profilepics/default.png')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields=['id', 'name', 'location']

class GetUserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        fields = Users._meta.fields # or Users._meta.get_fields()
        filtered_fields = [field.name for field in fields]
        filtered_fields.remove('password')
        _debuger(f'Userfields: {filtered_fields}')
        model = Users
        fields = filtered_fields

class PostUserSerializer(serializers.ModelSerializer):
    # company = CompanySerializer(read_only=True)
    class Meta:
        model = Users
        fields =  '__all__'
    
    def validate_fullname(self, fullname):
        return fullname.lower().strip()
    
    def validate_email(self, email):
        return emailValidation(email)
    
    def validate_password(self, password):
        return passwordValidation(password)
    
    def validate_phone(self, phone):
        return phoneValidation(phone)
    
    def validate_image(self, image):
        return imageValidation(image)

