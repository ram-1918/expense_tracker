from django.contrib import admin
from .models import AuthorizedUsers, Company, SuperAdmins, Admins, Users, RegisterationRequests, ProvidedPayments, Login

# Register your models here.

admin.site.register(AuthorizedUsers)
admin.site.register(Company)
admin.site.register(SuperAdmins)
admin.site.register(Admins)
admin.site.register(Users)
admin.site.register(ProvidedPayments)
admin.site.register(Login)
admin.site.register(RegisterationRequests)