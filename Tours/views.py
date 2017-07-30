from datetime import datetime, date

import Tours
import pytz
from Tours.models import Tour, ReserveTour, RequestForTour, Comments
from django.http import JsonResponse, Http404, response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework.authtoken.models import Token
from user.views import CustomObtainAuthToken


@csrf_exempt
def searchTour(request):
    if request.method == 'POST':
        bodyParams = json.loads(request.body)
        name = bodyParams['name']
        tour = Tour.objects.filter(name__contains=name)
        if len(tour) == 0:
            return JsonResponse({'status': -1, 'message': "No Tour Found"})
        if len(tour) >= 1:
            response = {
                "status": 0,
                "tours": [{'id': tour[0].id, 'name': tour[0].name, 'start_time': tour[0].start_date.timestamp(),
                           'end_time': tour[0].end_date.timestamp(), 'price': tour[0].price}]
            }
            if len(tour) == 1:
                return JsonResponse(response)
            i = 1
            while i < tour.count():
                response['tours'] = response['tours'] + [{'id': tour[i].id, 'name': tour[i].name, 'start_time': tour[i].start_date.timestamp(),
                           'end_time': tour[i].end_date.timestamp() , 'price': tour[i].price}]
                i = i + 1
            return JsonResponse(response)

    return JsonResponse({'status': -1})

@csrf_exempt
def getTour(request):
    bodyParams = json.loads(request.body)
    id = bodyParams['id']
    tour = Tour.objects.filter(id=id)
    if tour.count() == 0:
        return JsonResponse({'status': -1})

    comments = Comments.objects.filter(tourId=tour[0].id)
    if comments.count() == 0:
        response = {
            "status": 0,
            "tour": {'id': tour[0].id, 'name': tour[0].name, 'start_time': tour[0].start_date.timestamp(),
                     'end_time': tour[0].end_date.timestamp(), 'price': tour[0].price, 'spec': tour[0].spec,
                     'capacity': tour[0].capacity},
            "comments": [{}]}
    else:
        response = {
            "status": 0,
            "tour": {'id': tour[0].id, 'name': tour[0].name, 'start_time': tour[0].start_date.timestamp(),
                     'end_time': tour[0].end_date.timestamp(), 'price': tour[0].price, 'spec': tour[0].spec,
                     'capacity': tour[0].capacity},
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
def reserveTour(request):
    bodyParams = json.loads(request.body)
    tour_id = bodyParams['tourId']
    tour = Tour.objects.filter(id=tour_id)
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    print(user.id, tour_id)
    if len(tour) == 0:
        return JsonResponse({'status': -1})
    reserves = ReserveTour.objects.filter(student_id=user.id, tour_id=tour_id)
    # if not len(reserves) == 0:
    #     return JsonResponse({'status': -1})
    if not tour[0].capacity == 0:
        tour[0].capacity = tour[0].capacity - 1
        tour[0].save()
        reserve = ReserveTour.objects.create()
        reserve.student_id = user
        reserve.tour_id = tour[0]
        reserve.status = 0
        reserve.save()
        return JsonResponse({'status': 0})
    else:
        return JsonResponse({'status': -1})

@csrf_exempt
def cancelReserve(request):
    reserve = reserveFinder(request)
    bodyParams = json.loads(request.body)
    tour_id = bodyParams['tourId']
    tour = Tour.objects.filter(id=tour_id)
    if len(tour) == 0:
        return JsonResponse({'status': -1})

    if len(reserve) == 0:
        return JsonResponse({'status': -1})
    print(tour[0].capacity)
    tour[0].capacity = tour[0].capacity + 1
    tour[0].save()
    print(tour[0].capacity)
    reserve[0].delete()
    print("where")
    return JsonResponse({'status': 0})

@csrf_exempt
def payTour(request):
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
    #if datetime.utcnow().replace(tzinfo=pytz.UTC) > tour[0].start_date:
    #    return JsonResponse({'status': 3})
    if reserves[0].status == str(0):
        return JsonResponse({'status': 1})
    if reserves[0].status == str(1):
        return JsonResponse({'status': 2})

@csrf_exempt
def requestTour(request):
    bodyParams = json.loads(request.body)
    requestText = bodyParams['request']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    print('hhhosdsds')

    request = RequestForTour.objects.create()
    request.student_id = user
    request.textRequest = requestText
    request.save()
    return JsonResponse({'status': 0})


def reserveFinder(request):
    bodyParams = json.loads(request.body)
    tour_id = bodyParams['tourId']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    reserves = ReserveTour.objects.filter(student_id=user.id, tour_id=tour_id)
    return reserves