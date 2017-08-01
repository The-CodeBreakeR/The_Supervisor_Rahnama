from datetime import datetime, date

import Scheduling
import pytz
from Scheduling.models import Scheduling, ReserveScheduling, RequestForScheduling, Comments
from django.http import JsonResponse, Http404, response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import json
import datetime
from rest_framework.authtoken.models import Token
from user.views import CustomObtainAuthToken


@csrf_exempt
def searchScheduling(request):
    if request.method == 'POST':
        #bodyParams = json.loads(request.body)
        bodyParams = json.loads(request.body.decode('utf-8'))
        name = bodyParams['name']
        scheduling = Scheduling.objects.filter(name__contains=name)
        if len(scheduling) == 0:
            return JsonResponse({'status': -1, 'message': "No Scheduling Found"})
        if len(scheduling) >= 1:
            response = {
                "status": 0,
                "scheduling": [{'id': scheduling[0].id, 'name': scheduling[0].name, 'start_time': scheduling[0].start_date.timestamp(),
                           'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price}]
            }
            if len(scheduling) == 1:
                return JsonResponse(response)
            i = 1
            while i < scheduling.count():
                response['scheduling'] = response['scheduling'] + [{'id': scheduling[i].id, 'name': scheduling[i].name, 'start_time': scheduling[i].start_date.timestamp(),
                           'end_time': scheduling[i].end_date.timestamp() , 'price': scheduling[i].price}]
                i = i + 1
            return JsonResponse(response)

    return JsonResponse({'status': -1})

@csrf_exempt
def weekScheduling(request):
    if request.method == 'POST':
        #bodyParams = json.loads(request.body)
        #bodyParams = json.loads(request.body.decode('utf-8'))
        #name = bodyParams['name']
        #scheduling = Scheduling.objects.filter(name__contains=name)
        date = datetime.date.today()
        start_week = date - datetime.timedelta(date.weekday())
        end_week = start_week + datetime.timedelta(7)
        scheduling =Scheduling.objects.filter(end_date=[start_week, end_week])
        if len(scheduling) == 0:
            return JsonResponse({'status': -1, 'message': "No Scheduling Found"})
        if len(scheduling) >= 1:
            response = {
                "status": 0,
                "scheduling": [{'id': scheduling[0].id, 'name': scheduling[0].name, 'start_time': scheduling[0].start_date.timestamp(),
                           'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price}]
            }
            if len(scheduling) == 1:
                return JsonResponse(response)
            i = 1
            while i < scheduling.count():
                response['scheduling'] = response['scheduling'] + [{'id': scheduling[i].id, 'name': scheduling[i].name, 'start_time': scheduling[i].start_date.timestamp(),
                           'end_time': scheduling[i].end_date.timestamp() , 'price': scheduling[i].price}]
                i = i + 1
            return JsonResponse(response)

    return JsonResponse({'status': -1})

@csrf_exempt
def monthScheduling(request):
    if request.method == 'POST':
        #bodyParams = json.loads(request.body)
        #bodyParams = json.loads(request.body.decode('utf-8'))
        #name = bodyParams['name']
        #scheduling = Scheduling.objects.filter(name__contains=name)
        date = datetime.date.today()
        start_week = date - datetime.timedelta(date.weekday())
        end_week = start_week + datetime.timedelta(7)
        scheduling =Scheduling.objects.filter(end_date=[start_week, end_week])
        if len(scheduling) == 0:
            return JsonResponse({'status': -1, 'message': "No Scheduling Found"})
        if len(scheduling) >= 1:
            response = {
                "status": 0,
                "scheduling": [{'id': scheduling[0].id, 'name': scheduling[0].name, 'start_time': scheduling[0].start_date.timestamp(),
                           'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price}]
            }
            if len(scheduling) == 1:
                return JsonResponse(response)
            i = 1
            while i < scheduling.count():
                response['scheduling'] = response['scheduling'] + [{'id': scheduling[i].id, 'name': scheduling[i].name, 'start_time': scheduling[i].start_date.timestamp(),
                           'end_time': scheduling[i].end_date.timestamp() , 'price': scheduling[i].price}]
                i = i + 1
            return JsonResponse(response)

    return JsonResponse({'status': -1})


@csrf_exempt
def getScheduling(request):
    bodyParams = json.loads(request.body)
    id = bodyParams['id']
    scheduling = Scheduling.objects.filter(id=id)
    if scheduling.count() == 0:
        return JsonResponse({'status': -1})

    comments = Comments.objects.filter(schedulingId=scheduling[0].id)
    if comments.count() == 0:
        response = {
            "status": 0,
            "scheduling": {'id': scheduling[0].id, 'name': scheduling[0].name, 'start_time': scheduling[0].start_date.timestamp(),
                     'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price, 'spec': scheduling[0].spec,
                     'capacity': scheduling[0].capacity},
            "comments": [{}]}
    else:
        response = {
            "status": 0,
            "scheduling": {'id': scheduling[0].id, 'name': scheduling[0].name, 'start_time': scheduling[0].start_date.timestamp(),
                     'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price, 'spec': scheduling[0].spec,
                     'capacity': scheduling[0].capacity},
            "comments": [{'name': str(comments[0].studentId), 'text': str(comments[0].comment_text)}]}
        if comments.count() == 1:
            print(response)
            return JsonResponse(response)
        i = 1
        while i < comments.count():
            response['comments'] = response['comments'] + [
                {'name': str(comments[0].user.username), 'text': str(comments[0].comment_text)}]
            i = i + 1
    print(response)
    return JsonResponse(response)

@csrf_exempt
def reserveScheduling(request):
    bodyParams = json.loads(request.body)
    scheduling_id = bodyParams['schedulingId']
    scheduling = Scheduling.objects.filter(id=scheduling_id)
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    print(user.id, scheduling_id)
    if len(scheduling) == 0:
        return JsonResponse({'status': -1})
    reserves = ReserveScheduling.objects.filter(student_id=user.id, scheduling_id=scheduling_id)
    # if not len(reserves) == 0:
    #     return JsonResponse({'status': -1})
    if not scheduling[0].capacity == 0:
        scheduling[0].capacity = scheduling[0].capacity - 1
        scheduling[0].save()
        reserve = ReserveScheduling.objects.create()
        reserve.student_id = user
        reserve.scheduling_id = scheduling[0]
        reserve.status = 0
        reserve.save()
        return JsonResponse({'status': 0})
    else:
        return JsonResponse({'status': -1})

@csrf_exempt
def cancelReserve(request):
    reserve = reserveFinder(request)
    bodyParams = json.loads(request.body)
    scheduling_id = bodyParams['schedulingId']
    scheduling = Scheduling.objects.filter(id=scheduling_id)
    if len(scheduling) == 0:
        return JsonResponse({'status': -1})

    if len(reserve) == 0:
        return JsonResponse({'status': -1})
    print(scheduling[0].capacity)
    scheduling[0].capacity = scheduling[0].capacity + 1
    scheduling[0].save()
    print(scheduling[0].capacity)
    reserve[0].delete()
    print("where")
    return JsonResponse({'status': 0})

@csrf_exempt
def payScheduling(request):
    reserve = reserveFinder(request)
    if len(reserve) == 0:
        print("hi")
        return JsonResponse({'status': -1})
    reserve[0].status = 1
    print(reserve[0].status)
    reserve[0].save()
    return JsonResponse({'status': 0})

@csrf_exempt
def statusResult(request):
    reserves = reserveFinder(request)
    if len(reserves) == 0:
        return JsonResponse({'status': 0})
    #if datetime.utcnow().replace(tzinfo=pytz.UTC) > scheduling[0].start_date:
    #    return JsonResponse({'status': 3})
    if reserves[0].status == str(0):
        return JsonResponse({'status': 1})
    if reserves[0].status == str(1):
        return JsonResponse({'status': 2})

@csrf_exempt
def requestScheduling(request):
    bodyParams = json.loads(request.body)
    requestText = bodyParams['request']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    print('hhhosdsds')

    request = RequestForScheduling.objects.create()
    request.student_id = user
    request.textRequest = requestText
    request.save()
    return JsonResponse({'status': 0})


def reserveFinder(request):
    bodyParams = json.loads(request.body)
    scheduling_id = bodyParams['schedulingId']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    reserves = ReserveScheduling.objects.filter(student_id=user.id, scheduling_id=scheduling_id)
    return reserves