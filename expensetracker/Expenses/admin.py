from django.contrib import admin
from .models import Expenses, TypeTags, ExpenseProofs

# Register your models here.

admin.site.register(Expenses)
admin.site.register(TypeTags)
admin.site.register(ExpenseProofs)