from .models import Users, Login
import re
import time
import jwt
import base64
from django.conf import settings
from datetime import datetime, timedelta

# Utilized Factory Patterns
class HandleService():
    def handler(self, type, data):
        handle = self.getTypeMethod(type)
        return handle(data)
    
    def getTypeMethod(self, type):
        if type == 'email':
            return self.handleEmail
        elif type == 'password':
            return self.handlePassword
        elif type == 'phone':
            return self.handlePhone
    
    def handleEmail(self, email):
        email = email.strip()
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        if(re.fullmatch(regex, email)):
            print(f'Email Handled!')
            return email.lower()
        return None

    def handlePassword(self, password):
        if len(password) >= 7:
            ucase_check = list(map(lambda x : x.isupper(), password))
            if any(ucase_check):
                sym_check = list(map(lambda x : x in '!@#$%^&*+-', password))
                if any(sym_check):
                    if password[0] != '-':
                        print(f'Password Handled!')
                        return password
                    return 'The firstchar of the password should not be -'
                return 'Password should have atleast one of the symbols !@#$%^&*+-'
            return 'Password should have atleast one capital letter.'
        return 'Password should be atleast of 7 charecter long.'

    def handlePhone(self, phone):
        phone = phone.strip()
        patterns = [
            r'^\d{10}$',
            r'^\+\d{11,15}$',
            r'^\d{3}-\d{3}-\d{4}$',
            r'^\(\d{3}\)\s?\d{3}-\d{4}$'
        ]
        for pattern in patterns:
            if re.match(pattern, phone):
                return phone
        return None

class AuthenticationService():
    def handler(self, type, data):
        handle = self.getAuthType(type)
        return handle(data)

    def getAuthType(self, type):
        if type == 'auth':
            return self.isAuthenticated
        elif type == 'expense_requests':
            return self.handleExpenseRequest
        elif type == 'token_expiry':
            return self.handleTokenExpiry
    
    def generateJWTToken(self, payload):
        expiry_days = datetime.now() + timedelta(days=1)
        payload['exp'] = int(expiry_days.strftime('%s'))
        payload['iss'] = 'et_backend'
        payload['iat'] = datetime.now()
        token = jwt.encode(payload, key=settings.SECRET_KEY, algorithm='HS256')
        return token


    def isAuthenticated(self, userdata):
        user, _, password = userdata['user'], userdata['email'], userdata['password']
        if user.check_password(password):
            payload = {"sub":str(user.id)}
            token = self.generateJWTToken(payload)
            self.handleTokenExpiry(token)
            return token
        return False
    
    def handleTokenExpiry(self, token):
        try:
            decoded_token = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            expiry_epoch = decoded_token['exp']
            timeleft = datetime.fromtimestamp(expiry_epoch) - datetime.now()
            print(timeleft)
            return True
        except jwt.ExpiredSignatureError as e:
            # Signature has expired
            # redirect user to login page again
            print('Expired err ', e)
            return e
        except jwt.DecodeError as e:
            # invalid token - Not enough segments
            print("Token error", e)
            return e

    def handleExpenseRequest(self, request):
        print(f'{request} has been approved!')
        return True