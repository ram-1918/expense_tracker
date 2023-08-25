from rest_framework import serializers
from .models import Users, Login


from .services import HandleService, AuthenticationService

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
    
    def validate_email(self, email):
        handleObj = HandleService()
        email = handleObj.handler('email', email)
        if not email: raise serializers.ValidationError('Enter Valid Email!')
        return email
    
    def validate_password(self, password):
        handleObj = HandleService()
        password = handleObj.handler('password', password)
        if not password or password in ['symbol!', 'upper!', 'letternumber!', 'length!', 'firstchar']: 
            raise serializers.ValidationError(password)
        return password
    
    def validate_phone(self, phone):
        handleObj = HandleService()
        phone = handleObj.handler('phone', phone)
        if not phone: raise serializers.ValidationError('Enter Valid phone number!')
        return phone

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'