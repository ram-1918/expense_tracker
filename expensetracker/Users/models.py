from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from datetime import datetime


# Create your models here.
# https://docs.djangoproject.com/en/4.2/ref/contrib/auth/ - More on users methods, groups, permissions

class Company(models.Model):
    name = models.CharField(max_length=255, default='SiriInfo')
    location = models.CharField(max_length=255, default='New Jersey')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Company'

class AuthorizedUsers(models.Model):
    email = models.EmailField(max_length=255, default='example@siriinfo.com')

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'AuthorizedUsers'

# while user is being created, create a record for him in this table
class SuperAdmins(models.Model):
    name = models.CharField(max_length=255, default='Subba rao')
    empid = models.CharField(max_length=255, unique=True, default='empid')

    class Meta:
        verbose_name_plural = 'SuperAdmins'

    def __str__(self):
        return self.name + ' ' + self.empid

# while user is being created, create a record for him in this table
class Admins(models.Model):
    name = models.CharField(max_length=255, default='Billu')
    empid = models.CharField(max_length=255, unique=True, default='empid')
    is_employee = models.ForeignKey(SuperAdmins, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Admins'

    def __str__(self):
        return self.name + ' ' + self.empid + ' ' + str(self.is_employee.name)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    
    def create_staff(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, password, **extra_fields)

class Users(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255)
    datecreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_employee = models.ForeignKey(Admins, on_delete=models.CASCADE, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'phone', 'password']

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'

class ProvidedPayments(models.Model):
    paymenttypes = [('creditcard', 'Credit Card'), ('debitcard', 'Debit Card'), ('cash', 'Cash'), ('cheque', 'Cheque'), ('others', 'Others')]
    email = models.EmailField(max_length=255, default='example@gmail.com')
    empid = models.CharField(max_length=255, default='empid')
    type = models.CharField(choices=paymenttypes, max_length=10, default='cash')
    limit = models.CharField(max_length=255, default='500')
    dateadded = models.DateField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.user + ' ' + self.type

    class Meta:
        verbose_name_plural = 'ProvidedPayments'

class UserToProvidedPayments(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    payment = models.ForeignKey(ProvidedPayments, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.firstname + ' ' + self.payment.type

    class Meta:
        verbose_name_plural = 'UserToProvidedPayments'

class loginManager():
    def generate_jwt(self):
        self.save_record('id', 'email')
    
    def save_record(self, *args):
        print('Record saved with JWT\n', args)

class Login(models.Model):

    loginobjects = loginManager()
    userid = models.OneToOneField(Users, on_delete=models.DO_NOTHING, default=uuid.uuid4)
    email = models.CharField(max_length=255, unique=True)
    last_login = models.DateTimeField(auto_now=True)
    token = models.CharField(max_length=255, default=loginobjects.generate_jwt())

    class Meta:
        verbose_name_plural = 'Login'
    
    def __str__(self):
        return self.email
    


class RegisterationRequests(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255)
    datecreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True)
    comment = models.TextField(default='Please register me with this email')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_employee = models.ForeignKey(Admins, on_delete=models.CASCADE, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'RegistrationRequests'