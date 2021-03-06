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
from datetime import datetime, timedelta
from django.utils import timezone


@csrf_exempt
def searchScheduling(request):
    # if request.method == 'POST':
    # bodyParams = json.loads(request.body)
    bodyParams = json.loads(request.body.decode('utf-8'))
    name = bodyParams['name']
    scheduling = Scheduling.objects.filter(name__contains=name)
    print('myhoy',responseMaker(scheduling))
    return JsonResponse(responseMaker(scheduling))

    # return JsonResponse({'status': -1})


def responseMaker(scheduling):
    if len(scheduling) == 0:
        return {'status': -1, 'scheduling': []}
    if len(scheduling) >= 1:
        print(scheduling[0].info)
        response = {
            "status": 0,
            "scheduling": [
                {'id': scheduling[0].id, 'info': scheduling[0].info, 'name': scheduling[0].name,
                 'capasity': scheduling[0].capasity,
                 'end_time': scheduling[0].end_date.timestamp(),
                 'start_time': (scheduling[0].end_date - timedelta(days=scheduling[0].capasity)).timestamp()}]
        }
        if len(scheduling) == 1:
            return response
        i = 1
        while i < len(scheduling):
            print(scheduling[i].info)
            response['scheduling'] = response['scheduling'] + [
                {'id': scheduling[i].id, 'info': scheduling[i].info, 'name': scheduling[i].name,
                 'capasity': scheduling[i].capasity,
                 'end_time': scheduling[i].end_date.timestamp(),
                 'start_time': (scheduling[i].end_date - timedelta(days=scheduling[i].capasity)).timestamp()}]
            i = i + 1
        return response
    return {'status': -1, 'scheduling': []}


@csrf_exempt
def weekScheduling(request):
    # if request.method == 'POST':
    next_week = timezone.now().date() + timedelta(days=7)
    scheduling = Scheduling.objects.filter(end_date__lte=next_week, end_date__gte=datetime.today())
    print("ahah", responseMaker(scheduling))
    return JsonResponse(responseMaker(scheduling))

    # return JsonResponse({'status': -1})


@csrf_exempt
def monthScheduling(request):
    print("here 1")
    # if request.method == 'POST':
    last_month = timezone.now().today() - timedelta(days=30)
    scheduling = Scheduling.objects.filter(end_date__gte=last_month, end_date__lte=datetime.today())
    return JsonResponse(responseMaker(scheduling))

    # return JsonResponse({'status': -1})


@csrf_exempt
def todayScheduling(request):
    # if request.method == 'POST':
    date = timezone.now().today()
    scheduling = Scheduling.objects.filter(end_date=date)
    return JsonResponse(responseMaker(scheduling))

    # return JsonResponse({'status': -1})

@csrf_exempt
def dayScheduling(request):
    bodyParams = json.loads(request.body.decode('utf-8'))

    date = bodyParams['date']

    print('hooom1', date, timezone.now().today())
    scheduling = Scheduling.objects.filter(end_date=datetime.fromtimestamp(date))
    print('hooom',scheduling)
    return JsonResponse(responseMaker(scheduling))


@csrf_exempt
def hardDayScheduling(request):
    # if request.method == 'POST':
    next_week = timezone.now().date() + timedelta(days=7)
    scheduling = list(Scheduling.objects.filter(end_date__lte=next_week, end_date__gte=datetime.today()))

    for item in scheduling:
        flag = True
        for iter in scheduling:
            if (item.end_date - iter.end_date == timedelta(0)) and (item.name != iter.name) :
                flag = False
                print("hard2", item.name ,item.end_date.date(),iter.end_date.date, iter.name)
        if flag == True :
            print("hard1", item)
            scheduling.remove(item)

    for item in scheduling:
        flag = False
        for iter in scheduling:
            if (item.end_date - iter.end_date == timedelta(0)) and (item.name != iter.name) :
                flag = True
                print("hard2", item.name ,item.end_date.date(),iter.end_date.date, iter.name)
        if flag == True :
            print("hard1", item)
            scheduling.remove(item)
    print("hard",responseMaker(scheduling))
    return JsonResponse(responseMaker(scheduling))

    # return JsonResponse({'status': -1})


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
            "scheduling": {'id': scheduling[0].id, 'name': scheduling[0].name,
                           'start_time': scheduling[0].start_date.timestamp(),
                           'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price,
                           'spec': scheduling[0].spec,
                           'capacity': scheduling[0].capacity},
            "comments": [{}]}
    else:
        response = {
            "status": 0,
            "scheduling": {'id': scheduling[0].id, 'name': scheduling[0].name,
                           'start_time': scheduling[0].start_date.timestamp(),
                           'end_time': scheduling[0].end_date.timestamp(), 'price': scheduling[0].price,
                           'spec': scheduling[0].spec,
                           'capacity': scheduling[0].capacity},
            "comments": [{'name': str(comments[0].studentId), 'text': str(comments[0].comment_text)}]}
        if comments.count() == 1:
            print('hoy4',response)
            return JsonResponse(response)
        i = 1
        while i < comments.count():
            response['comments'] = response['comments'] + [
                {'name': str(comments[0].user.username), 'text': str(comments[0].comment_text)}]
            i = i + 1
    print('hoy3', response)
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
def requestScheduling(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    request = Scheduling.objects.create()
    request.name = bodyParams['name']
    print('hoy2',request.name)
    print('r',datetime.fromtimestamp(bodyParams['end_date']))
    request.end_date = datetime.fromtimestamp(bodyParams['end_date'])
    print('hoy33', request.end_date)
    request.capasity = bodyParams['capasity']
    request.info = bodyParams['info']
    request.save()
    scheduling = Scheduling.objects.filter(name__contains=request.name)
    print("dd",responseMaker(scheduling))
    print('created!')

    return JsonResponse({'status': 0})


@csrf_exempt
def reserveFinder(request):
    bodyParams = json.loads(request.body)
    scheduling_id = bodyParams['schedulingId']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    reserves = ReserveScheduling.objects.filter(student_id=user.id, scheduling_id=scheduling_id)
    return reserves
