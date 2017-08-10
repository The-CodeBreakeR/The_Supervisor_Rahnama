from rest_framework.parsers import JSONParser
from account.models import Income, Expense, LoanResponse, LoanRequest
from account.serializers import IncomeSerializer, ExpenseSerializer, \
    LoanResponseSerializer, LoanRequestSerializer
from rest_framework.authtoken.models import Token
from datetime import datetime, date
from user.views import CustomObtainAuthToken
from django.shortcuts import render
import json
from django.http import JsonResponse, Http404, response
from django.views.decorators.csrf import csrf_exempt
import pytz

@csrf_exempt
def getIncome(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    incomes = Income.objects.filter(student_id=stdid)
    if len(incomes) == 0:
        return JsonResponse({'status': -1, 'message': "No income found"})
    else:
        response = {
            "status": 0,
            "incomes": [{'id': incomes[0].id, 'amount': incomes[0].amount,
                       'source': incomes[0].source}]
        }
        if len(incomes) == 1:
            return JsonResponse(response)
        i = 1
        while i < incomes.count():
            response['incomes'] = response['incomes'] + [
                {'id': incomes[i].id, 'amount': incomes[i].amount,
                 'source': incomes[i].source}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def newIncome(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    amount = bodyParams['amount']
    source = bodyParams['source']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    newinc = Income.objects.create()
    newinc.student_id = stdid
    newinc.amount = amount
    newinc.source = source
    newinc.save()
    return JsonResponse({'status': 0})

@csrf_exempt
def getExpense(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    expenses = Expense.objects.filter(student_id=stdid)
    if len(expenses) == 0:
        return JsonResponse({'status': -1, 'message': "No expense found"})
    else:
        response = {
            "status": 0,
            "expenses": [{'id': expenses[0].id, 'amount': expenses[0].amount,
                       'destination': expenses[0].destination}]
        }
        if len(expenses) == 1:
            return JsonResponse(response)
        i = 1
        while i < expenses.count():
            response['expenses'] = response['expenses'] + [
                {'id': expenses[i].id, 'amount': expenses[i].amount,
                 'destination': expenses[i].destination}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def newExpense(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    amount = bodyParams['amount']
    destination = bodyParams['destination']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    newexp = Expense.objects.create()
    newexp.student_id = stdid
    newexp.amount = amount
    newexp.destination = destination
    newexp.save()
    return JsonResponse({'status': 0})

@csrf_exempt
def getRequest(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    requests = LoanRequest.objects.filter(student_id=stdid)
    if len(requests) == 0:
        return JsonResponse({'status': -1, 'message': "No request found"})
    else:
        response = {
            "status": 0,
            "requests": [{'id': requests[0].id, 'amount': requests[0].amount,
                       'purpose': requests[0].purpose}]
        }
        if len(requests) == 1:
            return JsonResponse(response)
        i = 1
        while i < requests.count():
            response['requests'] = response['requests'] + [
                {'id': requests[i].id, 'amount': requests[i].amount,
                 'purpose': requests[i].purpose}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def newRequest(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    amount = bodyParams['amount']
    purpose = bodyParams['purpose']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    newreq = LoanRequest.objects.create()
    newreq.student_id = stdid
    newreq.amount = amount
    newreq.purpose = purpose
    newreq.save()
    return JsonResponse({'status': 0, 'id': newreq.id})

@csrf_exempt
def getResponse(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    requestID = bodyParams['requestID']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    resp = LoanResponse.objects.filter(student_id=stdid, request_id=requestID)
    if len(resp) == 0:
        return JsonResponse({'status': -1, 'message': "No response found"})
    else:
        response = {
            'status': 0, 'answer': resp[0].answer,
            'repayment_period': resp[0].repayment_period,
            'repayment_rate': resp[0].repayment_rate
        }
    return JsonResponse(response)

@csrf_exempt
def getCondition(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    condition = 3
    balance = 0
    incomes = Income.objects.filter(student_id=stdid)
    i = 0
    while i < incomes.count():
        balance = balance + incomes[i].amount
        i = i + 1
    expenses = Expense.objects.filter(student_id=stdid)
    i = 0
    while i < expenses.count():
        balance = balance - expenses[i].amount
        i = i + 1
    if balance < 2000000:
        condition = 2
    if balance < 0:
        condition = 1
    if balance < -2000000:
        condition = 0
    response = {
        'status': 0, 'balance': balance,
        'condition': condition
    }
    return JsonResponse(response)