from django.contrib import admin
from .models import Category, Expenses, TypeTags, ExpenseProofs

# Register your models here.

admin.site.register(Category)
admin.site.register(Expenses)
admin.site.register(TypeTags)
admin.site.register(ExpenseProofs)