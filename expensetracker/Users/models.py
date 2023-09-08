from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from datetime import datetime
import bcrypt


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
    choices = [('superadmin', 'Superadmin'), ('admin', 'admin'), ('employee', 'employee')]
    email = models.EmailField(max_length=255, default='example@siriinfo.com')
    employeeid = models.CharField(max_length=24, default='employeeid')
    role = models.CharField(choices=choices, max_length=24, default=3)

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Authorized Users'

# bcrypt is slow(speed can be managed, usually 12 is used in gensalt() to dictate the slowness); salt is stored inside the hash itself
def get_hashed_password(plain_password):
    return bcrypt.hashpw(plain_password, bcrypt.gensalt(12))

def check_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password, hashed_password)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        h_password = get_hashed_password(password)
        user = self.model(email=email, password=h_password, **extra_fields)
        # user.set_password(password)
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
    print(instance, filename, 'ghvhgvh')
    return 'profilepics/{filename}'.format(filename=filename) if filename else 'profilepics/default.png'


class Users(AbstractBaseUser):
    last_login = None
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 

    choices = [('superadmin', 'Superadmin'), ('admin', 'admin'), ('employee', 'employee')]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    fullname = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True, default="email@siriinfo.com")
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, default='profilepics/default.png')
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(choices=choices, max_length=24, default='3')
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, default=4)
    
    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    day = models.IntegerField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.created_at:
            self.year = self.created_at.year
            self.month = self.created_at.month
            self.day = self.created_at.day
        super().save(*args, **kwargs)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'password']

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'

# class loginManager():
#     def generate_jwt(self):
#         self.save_record('id', 'email')
    
#     def save_record(self, *args):
#         print('Record saved with JWT\n', args)

# class Login(models.Model):

#     loginobjects = loginManager()
#     userid = models.OneToOneField(Users, on_delete=models.DO_NOTHING, default=uuid.uuid4)
#     email = models.CharField(max_length=255, unique=True)
#     last_login = models.DateTimeField(auto_now=True)
#     token = models.CharField(max_length=255, default=loginobjects.generate_jwt())

#     class Meta:
#         verbose_name_plural = 'Login'
    
#     def __str__(self):
#         return self.email

class RegisterationRequests(models.Model):

    # def create_user(self, email, password=None, **extra_fields):
    #     if not email:
    #         raise ValueError('The Email field must be set')
    #     email = self.normalize_email(email)
    #     h_password = get_hashed_password(password)
    #     user = self.model(email=email, password=h_password, **extra_fields)
    #     # user.set_password(password)
    #     user.save()
    #     return user
    
    last_login = None

    choices = [('1', 'Superadmin'), ('2', 'admin'), ('3', 'employee')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    fullname = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True, default="email@siriinfo.com")
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    datecreated = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee_id = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(choices=choices, max_length=24, default='3')
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, default=4)
    comment = models.TextField(default='Could you please validate and register my profile?')

    objects = UserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Registration Requests'