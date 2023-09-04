# cookieapp/authenticate.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions
from .services import AuthenticationService

def enforce_csrf(request):
    check = CSRFCheck()
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)

class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        print(header, 'AUTH_IN_CALSS')
        
        if header is None:
            raw_token = request.COOKIES.get('jwt') or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        validate = AuthenticationService()
        validated_token = validate.handler('token_expiry', raw_token)
        print(validated_token, "VALIDATED TOEK")
        print(raw_token)
        # validated_token = self.get_validated_token(raw_token)
        print("VALIDATED ", raw_token)
        # enforce_csrf(request) 
        print('________----_--_--_-_-_-_---_-_--------------_---__--_---')
        return validated_token, validated_token