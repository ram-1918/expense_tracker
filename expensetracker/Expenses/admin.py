from django.contrib import admin
from .models import Expenses, ExpenseType

# Register your models here.

admin.site.register(ExpenseType)
admin.site.register(Expenses)