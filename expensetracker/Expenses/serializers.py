from .models import TypeTags, Expenses, ExpenseProofs
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

class ExpenseSerializer(ModelSerializer):
    # use related names for nested serializing - prrofe_expense, tag_expense
    proof_expense = ExpenseProofSerializerReadOnly(many=True, read_only=True)
    tag_expense = TypeTagSerializerReadOnly(many=True, read_only=True)

    class Meta:
        model = Expenses
        fields = ['id', 'userid','name', 'amount', 'description', 'submitted_date', 'status', 'proof_expense', 'tag_expense']

    # def validate_submitted_date(self, date):
    #     formatted_date = date.strftime('%b %d %Y')
    #     return formatted_date