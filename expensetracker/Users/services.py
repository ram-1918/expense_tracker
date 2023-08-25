from .models import Users, Login
import re
import phonenumbers

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
                        return password.strip().lower()
                    return 'firstchar'
                return 'symbol!'
            return 'upper!'
        return 'length!'

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
    
    def isAuthenticated(self, userdata):
        user, email, password = userdata['user'], userdata['email'], userdata['password']
        if user.check_password(password):
            print(f'{user} is authenticated against the Users DB and its password')
            return True
        return False
    
    def handleExpenseRequest(self, request):
        print(f'{request} has been approved!')
        return True