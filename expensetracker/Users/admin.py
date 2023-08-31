from django.contrib import admin
from .models import AuthorizedUsers, Company, Users, RegisterationRequests, Login

# Register your models here.

admin.site.register(AuthorizedUsers)
admin.site.register(Company)
admin.site.register(Users)
admin.site.register(Login)
admin.site.register(RegisterationRequests)