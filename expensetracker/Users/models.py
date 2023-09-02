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
        extra_fields.setdefault('is_employee', False)
        return self.create_user(email, password, **extra_fields)
    
    def create_staff(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_employee', False)
        return self.create_user(email, password, **extra_fields)

def upload_to(instance, filename):
    return 'profilepics/{filename}'.format(filename=filename) if filename else 'profilepics/default.png'

class Users(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    fullname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    datecreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    # is_employee = models.ForeignKey(Admins, on_delete=models.CASCADE, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'password']

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'

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

class RegisterationRequests(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    fullname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255)
    datecreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    comment = models.TextField(default='Could you please validate and register my profile?')
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    objects = UserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Registration Requests'