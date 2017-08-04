from rest_framework import serializers
from .models import Income, Expense, LoanRequest, LoanResponse


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'student_id', 'amount', 'source')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'student_id', 'amount', 'destination')

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ('id', 'student_id', 'amount', 'purpose')

class LoanResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanResponse
        fields = ('id', 'request_id', 'student_id', 'answer', 'repayment_period', 'repayment_rate')