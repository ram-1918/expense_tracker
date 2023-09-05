from .models import Expenses, TypeTags, ExpenseProofs
from .serializers import TypeTagSerializer, ExpenseSerializer, ExpenseProofSerializer
from Users.models import Users, AuthorizedUsers
from Users.authentication import login_required, GlobalAccess, decode_uuid

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view

import json


# Create your views here.

def decodeddata():
    obj = GlobalAccess()
    return (decode_uuid(obj.data['sub']), obj.data['role'])

def testing(request):
    return Response('Expenses app')

def format(image):
    # format stuff
    return image

def processFormData(data):
    newData = {}
    for k,v in dict(data).items():
        if 'image' not in k: 
            newData[k] = v[0]
    return newData

def handleExpense(data, userid):
    data['userid'] = userid
    serializer = ExpenseSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data

def handleImages(images, expenseid):
    for k, v in images.items():
        data = {
            "expense": expenseid,
            "name": k,
            "image": v
        }
        ser = ExpenseProofSerializer(data=data)
        ser.is_valid(raise_exception=True)
        ser.save()

def handleTags(tags, expenseObj):
    tags = list(map(lambda x : x.strip(), tags))
    print(tags)
    records = [TypeTags(expense=expenseObj, name=tag) for tag in tags]
    print(records)
    TypeTags.objects.bulk_create(records)

@api_view(['POST'])
@login_required
def post_expenses(request):
    userid, _ = decodeddata()
    data = processFormData(request.data)
    tags = data.pop('tags').split(',')
    try:
        expenseData = handleExpense(data, userid)
        Expenseobj = Expenses.objects.filter(id=expenseData['id']).first()
        handleImages(request.FILES, expenseData['id'])
        handleTags(tags, Expenseobj)
        return {"id": Expenseobj.id}
    except:
        return {"msg": "errorocured"}

@api_view(['GET'])
@login_required
def get_expenses(request):
    userid, role = decodeddata()
    print(userid, role)
    expenses = Expenses.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return serializer.data

# @api_view(['GET'])
# @login_required
# def get_expense_by_user(request):
#     userid, role = decodeddata()




    



