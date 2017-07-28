from rest_framework import serializers
from .models import Income, Expense, LoanRequest, LoanResponse


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = '__all__'

class LoanResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanResponse
        fields = '__all__'