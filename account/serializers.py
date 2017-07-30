from rest_framework import serializers
from .models import Income, Expense, LoanRequest, LoanResponse


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('source', 'amount')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('destination', 'amount')

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ('id', 'purpose', 'amount')

class LoanResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanResponse
        fields = ('request_id', 'answer', 'repayment_period', 'repayment_rate')