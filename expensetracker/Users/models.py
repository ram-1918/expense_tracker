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
    choices = [('superadmin', 'Superadmin'), ('admin', 'admin'), ('employee', 'employee')]
    colorChoices = [('red', 'red'), ('blue', 'blue'), ('green', 'green'), ('yellow', 'yellow'), ('purple', 'purple'), ('gray', 'gray')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    fullname = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True, default="email@siriinfo.com")
    phone = models.CharField(max_length=12, blank=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, default='profilepics/default.png')
    employee_id = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(choices=choices, max_length=24, default='employee')
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    colortag = models.CharField(choices=colorChoices, max_length=10, default='gray') # for categorizing users on certain criteria
    authorized = models.BooleanField(default=False) # status for letting new users
    comment = models.TextField(default='Authorize normally')
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    # gender = models.CharField(choices = [('male', 'Male'), ('female', 'Female')], max_length=10, default='male')
    
    created_at = models.DateTimeField(auto_now=True)
    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    day = models.IntegerField(null=True, blank=True)

    @property
    def is_authorized(self):
        return self.authorized
    
    @classmethod
    def get_total_users(cls):
        print('INSIDE CLASSMETHOD')
        return cls.objects.all().count()

    @property
    def get_date_created(self):
        date = self.created_at
        return f'{date.year}-{date.month}-{date.day}'
    
    @property
    def get_last_modified(self):
        return f'{self.year}-{self.month}-{self.day}'
    
    @staticmethod
    def get_current_year():
        return datetime.now().year
    
    def save(self, *args, **kwargs):
        print('INSDIE SAVE METHOD IN MODELS', self.created_at, 'HERE')
        self.year = datetime.now().year
        self.month = datetime.now().month
        self.day = datetime.now().day
        print(self.day, self.year, self.month)
        super().save(*args, **kwargs)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'password']

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'

