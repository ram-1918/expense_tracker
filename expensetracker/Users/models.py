from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

# Create your models here.
# https://docs.djangoproject.com/en/4.2/ref/contrib/auth/ - More on users methods, groups, permissions

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
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_employee = models.CharField(max_length=255, blank=False, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'phone', 'password']

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'
    

class loginManager():
    def generate_jwt(self):
        print('jwt token method is called ')
        self.save_record('id', 'email')
    
    def save_record(self, *args):
        print('Record saved with JWT\n', args)

class Login(models.Model):

    loginobjects = loginManager()
    
    email = models.CharField(max_length=255, unique=True)
    last_login = models.DateTimeField(auto_now=True)
    token = models.CharField(max_length=255, default=loginobjects.generate_jwt())

    class Meta:
        verbose_name_plural = 'Login'
    
