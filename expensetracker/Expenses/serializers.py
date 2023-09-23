from .models import Category, TypeTags, Expenses, ExpenseProofs
from Users.serializers import UserSerializer, ListUserSerializer

from rest_framework.serializers import ModelSerializer
from datetime import datetime

class ExpenseProofSerializer(ModelSerializer):
    class Meta:
        model = ExpenseProofs
        fields = '__all__'

class TypeTagSerializer(ModelSerializer):
    class Meta:
        model = TypeTags
        fields = '__all__'


class ExpenseProofSerializerReadOnly(ModelSerializer):
    class Meta:
        model = ExpenseProofs
        fields = ['name', 'image']

class TypeTagSerializerReadOnly(ModelSerializer):
    class Meta:
        model = TypeTags
        fields = ['name']

class Category(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class ExpenseSerializer(ModelSerializer):
    # use related names for nested serializing - proof_expense, tag_expense
    # tag_expense = TypeTagSerializerReadOnly(many=True, read_only=True)
    # expense_proof = ExpenseProofSerializerReadOnly(many=True, read_only=True)
    user_info = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Expenses
        fields = ['id', 'category', 'userid', 'amount', 'description', 'date_submitted', 'last_modified',  'payment_recepient', 'payment_method', 'status', 'currency', 'rejection_count', 'user_info']

