from django.shortcuts import render
from django.shortcuts import HttpResponse

# Create your views here.

def testing(request):
    return HttpResponse('Expenses app')
