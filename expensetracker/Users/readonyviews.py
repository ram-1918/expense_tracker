from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import status

from .models import AuthorizedUsers, Company, Users

from .readonlyserializers import RO_UserSerializer, RO_CompanySerializer

from .authentication import login_required, decode_uuid, GlobalAccess


def decodeddata():
    globalvars = GlobalAccess()
    return globalvars.data

@api_view(['GET'])
@login_required
def get_users(request):
    print(decodeddata())
    users = Users.objects.all()
    serializer = RO_UserSerializer(users, many=True)
    return serializer.data

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
        serializer = RO_CompanySerializer(companies, many=True)
        return serializer.data
    elif role in ['2', '3']:
        user = Users.objects.filter(id=id).first()
        company = Company.objects.filter(id=user.company_id).first()
        serializer = RO_CompanySerializer(company)
        return serializer.data

@api_view(['GET'])
def get_users_by_company(request, role, company):
    if role in ['admin', 'superadmin']:
        users = Users.objects.filter(company=company)
        serializer = RO_UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)



'''
Optimize code if possible, create groups, Images upload(IMP)
request > each page (should retrieve id from URL) (create reusable code blocks(for retrieving params from URL) in react and django) > 
'''
    