from .models import Category, TypeTags, Expenses, ExpenseProofs
from Users.serializers import GetUserSerializer

from rest_framework.serializers import ModelSerializer
from datetime import datetime

from Users.authentication import _debuger

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
    
class GetExpenseSerializer(ModelSerializer):
    # use related names for nested serializing - proof_expense, tag_expense
    # tag_expense = TypeTagSerializerReadOnly(many=True, read_only=True)
    # expense_proof = ExpenseProofSerializerReadOnly(many=True, read_only=True)
    user_info = GetUserSerializer(read_only=True, many=True)

    class Meta:
        fields = [field.name for field in Expenses._meta.get_fields()]
        fields = sorted(fields, key = lambda x: len(x))
        _debuger(f'Expensesfeilds: {fields}')
        model = Expenses
        fields = fields # ['id', 'category', 'userid', 'amount', 'description', 'date_submitted', 'last_modified',  'payment_recepient', 'payment_method', 'status', 'currency', 'rejection_count', 'user_info']

class PostExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expenses
        fields = "__all__"

    def validate(self, validated_data):
        print(validated_data, "FROM VALIDATE")
        return validated_data