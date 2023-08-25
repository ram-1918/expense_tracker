from django.db import models
from Users.models import Users

from datetime import datetime

# Create your models here.
class ExpenseType(models.Model):
    choices = [
        ('travel', 'Travel'), ('medical', 'Medical'), ('company', 'Company'), 
        ('guesthouses', 'Guest Houses'), ('ragular', 'Regular')]
    # type = models.CharField(max_length=255, default='regular')
    type = models.CharField(max_length=255, choices=choices, default='regular')


def upload_to(instance, filename):
    today = datetime.now()
    print(f'Uploading to: uploads/{today.year}/{today.month}/{today.day}/{filename}')
    return f'uploads/{today.year}/{today.month}/{today.day}/{filename}'

class Expenses(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.DO_NOTHING)
    categoryid = models.ForeignKey(ExpenseType, on_delete=models.CASCADE)
    amount = models.CharField(max_length=255, blank=False, null=True)
    submitted_date = models.DateTimeField(auto_now=True)
    last_modified = models.DateTimeField(auto_now_add=True)
    proof = models.ImageField(upload_to=upload_to, blank=True)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Expenses'
