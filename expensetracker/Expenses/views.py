from .models import Category, Expenses, TypeTags, ExpenseProofs
from .serializers import TypeTagSerializer, ExpenseSerializer, ExpenseProofSerializer
from Users.serializers import GetUserSerializer
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
    
def getusername(userid):
    try:
        name = Users.objects.filter(id=userid).first().fullname
        return name
    except:
        return {"msg": "error occured"}

def getcategortname(catid):
    try:
        name = Category.objects.filter(id=catid).first().name
        return name
    except:
        return {"msg": "error occured"}

@api_view(['GET'])
@login_required
def get_expenses(request):
    userid, role = decodeddata()
    company_of_the_requester = Users.objects.filter(id = userid, is_active = True).first().company
    expenses = []
    if role == 'superadmin':
        expenses = Expenses.objects.select_related().all()
    elif role == 'admin':
        expenses = Expenses.objects.select_related().filter(userid__role = "employee" ).filter(userid__company = company_of_the_requester.id)
    data = []
    for  obj in expenses:
        username, category = obj.userid.fullname, obj.category.name
        obj = obj.__dict__
        obj.pop('_state')
        obj.pop('userid_id')
        obj.pop('category_id')
        data.append({**obj, "username": username, "category": category })
    return data

@api_view(['GET'])
@login_required
def get_expenses_by_user(request):
    userid, role = decodeddata()
    expenses = Expenses.objects.filter(userid = userid)
    print(expenses)
    serializer = ExpenseSerializer(expenses, many=True)
    return serializer.data

@api_view(['GET'])
@login_required
def get_user_for_an_expense(request, expid):
    userid, role = decodeddata()
    user = Expenses.objects.filter(id=expid).first()
    userinfo = GetUserSerializer(user.userid)
    return userinfo.data

@api_view(['GET'])
@login_required
def get_expenses_by_role(request):
    userid, role = decodeddata()
    if role == 'admin':
        # expenses = Expenses.objects.prefetch_related('userid').filter(company=7)
        user = Users.objects.filter(id=userid).first()
        expenses = Expenses.objects.filter(userid__company = user.company, userid__role='employee', status = '3')
        # print(user.fullname, user.role, user.company, role, expenses)
        # for obj in expenses:
        #     print(obj.name, obj.userid, obj.userid.company, obj.userid.role)
        expenses_under_admin = ExpenseSerializer(expenses, many=True)
        return expenses_under_admin.data
    elif role == 'superadmin':
        expenses = Expenses.objects.all()
        expenses_under_superadmin = ExpenseSerializer(expenses, many=True)
        return expenses_under_superadmin
    return "unauthorized"
        
@api_view(['PATCH'])
@login_required
def update_status(request, pk):
    change = request.data['change']
    expid = request.data['id']
    expenses = Expenses.objects.filter(id=expid).filter().first()
    print(pk, request.data, '_-_-_-_---_', change)
    try:
        if change == 'accept':
            print(expenses.status, expenses)
            expenses.status = '1' # 1 - approved
            expenses.save()
            print(expenses)
        else:
            expenses.status = '2' # 2 - rejected
            expenses.save()
            print(expenses)
        return 'ok'
    except:
        return 'failed'
