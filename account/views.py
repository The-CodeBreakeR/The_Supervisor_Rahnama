from rest_framework.parsers import JSONParser
from account.models import Income, Expense, LoanResponse, LoanRequest
from account.serializers import IncomeSerializer, ExpenseSerializer, \
    LoanResponseSerializer, LoanRequestSerializer
from django.http import JsonResponse

def getIncome(request):
    stdid = 1 ###
    serializer = IncomeSerializer(Income.objects.filter(student_id=stdid), many=True)
    return JsonResponse(serializer.data)

def newIncome(request):
    data = JSONParser().parse(request)
    serializer = IncomeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

def getExpense(request):
    stdid = 1 ###
    serializer = ExpenseSerializer(Expense.objects.filter(student_id=stdid), many=True)
    return JsonResponse(serializer.data)

def newExpense(request):
    data = JSONParser().parse(request)
    serializer = ExpenseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

def newRequest(request):
    data = JSONParser().parse(request)
    serializer = LoanRequestSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

def getResponse(request, id):
    stdid = 1 ###
    serializer = LoanResponseSerializer(LoanResponse.objects.filter(student_id=stdid,
                                                                    request_id=id), many=True)
    return JsonResponse(serializer.data)