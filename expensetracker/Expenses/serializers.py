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


class GetExpenseProofSerializer(ModelSerializer):
    class Meta:
        model = ExpenseProofs
        fields = ['id', 'filename', 'image']

class GetTypeTagSerializer(ModelSerializer):
    class Meta:
        model = TypeTags
        fields = ['id', 'name']

class Category(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class GetExpenseSerializer(ModelSerializer):
    # use related names for nested serializing - proof_expense, tag_expense
    expense_tag = GetTypeTagSerializer(many=True, read_only=True)
    expense_proof = GetExpenseProofSerializer(many=True, read_only=True)
    user_info = GetUserSerializer(read_only=True, many=True)

    class Meta:
        fields = [field.name for field in Expenses._meta.get_fields()] + ['user_info', 'expense_proof', 'expense_tag']
        fields = sorted(fields, key = lambda x: len(x))
        _debuger(f'Expensesfeilds: {fields}')
        model = Expenses
        fields = fields # ['id', 'category', 'userid', 'amount', 'description', 'date_submitted', 'last_modified',  'payment_recepient', 'payment_method', 'status', 'currency', 'rejection_count', 'user_info']

    def validate(self, data):
        # print(data, "VLAIDITN")
        # cat_instance = Category.objects.filter(id=category).first()
        # return cat_instance.name if cat_instance else category
        return data

class PostExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expenses
        fields = "__all__"

    def validate(self, validated_data):
        # print(validated_data, "FROM VALIDATE")
        return validated_data