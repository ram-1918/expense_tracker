from rest_framework import serializers
from .models import Users, Company, RegisterationRequests
import os


from .services import HandleService, AuthenticationService

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
    
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
        handleObj = HandleService()
        phone = handleObj.handler('phone', phone)
        if not phone: raise serializers.ValidationError('Enter a valid phone number.')
        return phone

    
    # def validate_image(self, image):
    #     print(image, '><><><><><><<><><><><><')
    #     return os.path.join('http://127.0.0.1:8000/ExpenseMedia/', image)

class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['fullname', 'email', 'phone', 'image', 'is_active', 'role', 'company', 'employeeid']

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