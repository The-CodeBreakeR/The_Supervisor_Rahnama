from rest_framework import viewsets
from .models import Income, Expense, LoanRequest, LoanResponse
from .serializers import IncomeSerializer, ExpenseSerializer, LoanRequestSerializer, LoanResponseSerializer


class IncomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Income.objects.all().order_by('income_id')
    serializer_class = IncomeSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Expense.objects.all().order_by('expense_id')
    serializer_class = ExpenseSerializer

class LoanRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Income.objects.all().order_by('request_id')
    serializer_class = LoanRequestSerializer

class LoanResponseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Income.objects.all().order_by('response_id')
    serializer_class = LoanResponseSerializer