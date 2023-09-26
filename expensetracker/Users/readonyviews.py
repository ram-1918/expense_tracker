from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status

from .models import AuthorizedUsers, Company, Users

from .serializers import CompanySerializer, GetUserSerializer

from .authentication import login_required, decode_uuid, GlobalAccess


def decodeddata():
    globalvars = GlobalAccess()
    return globalvars.data

# PROTECTED - list of users with filters
@api_view(['POST'])
@login_required
def list_users(request):
    decoded = decodeddata()
    id = decode_uuid(decoded['sub'])
    user = Users.objects.filter(id=id).first()  

    print('DATA REQUESTED BY USER FOR LIST - ', request.data)
    filters = request.data['filters']
    if user.role in ['superadmin', 'admin']:
        if user.role == 'admin':
            users = Users.objects.filter(company=user.company).exclude(id=id)
        else:
            users = Users.objects.all()

        if filters:
            [fullname, role, company, isactive, isauthorized, tag, location, fromdate, todate] = filters.values()
            print(fullname, role, company, isactive, isauthorized, tag, location, fromdate, todate)
            if role: users = users.filter(role=role.lower())
            if company: users = users.filter(company__name=company.lower()) 
            if isactive: users = users.filter(is_active = isactive)
            if isauthorized: users = users.filter(authorized = isauthorized)
            if tag: users = users.filter(colortag=tag)
            if fromdate and todate: users = users.filter(created_at__range=[fromdate, todate])
            if fullname: users = users.order_by(fullname)
        if not users: return {"msg": "No users found"}
        ser = GetUserSerializer(users, many=True)
        data =[]
        for obj in ser.data: 
            data.append({**obj, 'company':obj['company']['name']})
        return {"data": data, "count":len(ser.data)}
    return {"msg": 'unauthorized'} # Response('Notvalid')
    

@api_view(['GET'])
@login_required
def get_companies(request):
    decoded_data = decodeddata()
    print("DATA FROM GLOBAL",decoded_data)
    id = decode_uuid(decoded_data['sub'])
    role = decoded_data['role']
    if role == '1':
        print("SUPERADMIN")
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return serializer.data
    elif role in ['2', '3']:
        user = Users.objects.filter(id=id).first()
        company = Company.objects.filter(id=user.company_id).first()
        serializer = CompanySerializer(company)
        return serializer.data

@api_view(['GET'])
@login_required
def get_users_by_company(request, company):
    decoded_data = decodeddata()
    id = decode_uuid(decoded_data['sub'])
    role = decoded_data['role']
    if role in ['admin', 'superadmin']:
        users = Users.objects.filter(company=company)
        serializer = GetUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['GET'])
# @login_required
# @admin_required
# def get_registration_requests(request):
#     users = Users.objects.filter(authorized = False)
#     filteredUsers = GetUserSerializer(users, many=True)
#     return filteredUsers.data


'''
Optimize code if possible, create groups, Images upload(IMP)
request > each page (should retrieve id from URL) (create reusable code blocks(for retrieving params from URL) in react and django) > 
'''
    

'''
@api_view(['POST'])
@login_required
def list_users(request):
decoded = decodeddata()
id = decode_uuid(decoded['sub'])
user = Users.objects.filter(id=id).first()  

print('DATA REQUESTED BY USER FOR LIST - ', request.data)

if user.role in ['superadmin', 'admin']:
    params = request.query_params      
    if params:
        if 'ordering' in params.keys():
            print(params.get('ordering'), 'ORDERING')
            users = Users.objects.all().order_by(params.get('ordering'))
        else:
            filter_dic = {}
            for key in params.keys(): filter_dic[key] = params.get(key)
            users = Users.objects.filter(**filter_dic)
    else:
        if user.role == 'admin':
            users = Users.objects.filter(company=user.company).exclude(id=id)
        else:
            users = Users.objects.all()
    ser = ListUserSerializer(users, many=True)
    return {"data": ser.data, "count":len(ser.data)}
return {"msg": 'unauthorized'} # Response('Notvalid')
'''