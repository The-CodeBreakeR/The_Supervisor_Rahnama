from datetime import datetime

import Tours
from Tours.models import Tour, ReserveTour
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

    response = {
        "status": 0,
        "tour": {'id': tour[0].id, 'name': tour[0].name, 'start_time': tour[0].start_date.timestamp(),
                  'end_time': tour[0].end_date.timestamp(), 'price': tour[0].price, 'spec': tour[0].spec,
                  'capacity': tour[0].capacity}
    }
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
        print("hi")
        return JsonResponse({'status': 0})
    else:
        return JsonResponse({'status': -1})


def cancelReserve(request, id):
    # to be complete
    std_id = 1
    tour = Tour.objects.filter(id=id)
    reserve = ReserveTour.objects.filter(student_id=std_id, tour_id=id)
    if len(tour) == 0:
        return JsonResponse({'status': -1})

    if len(reserve) == 0:
        return JsonResponse({'status': -1})
    tour[0].capacity = tour[0].capacity + 1
    tour[0].save()
    reserve[0].delete()
    return JsonResponse({'status': 0})


def payTour(request):
    std_id = 1
    tour_id = 1
    reserve = ReserveTour.objects.filter(tour_id=tour_id, student_id=std_id)
    if len(reserve) == 0:
        return JsonResponse({'status': -1, 'message': "No Tour Found"})
    reserve[0].status = 1
    return JsonResponse({'status': 0, 'message': "tour reserve is complete"})

@csrf_exempt
def statusResult(request):
    bodyParams = json.loads(request.body)
    tour_id = bodyParams['tourId']
    tour = Tour.objects.filter(id=tour_id)
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    reserves = ReserveTour.objects.filter(student_id=user.id, tour_id=tour_id)
    if len(reserves) == 0:
        return JsonResponse({'status': 0})
    if datetime.now > tour.start_date:
        return JsonResponse({'status': 3})
    if reserves[0].status == 0:
        return JsonResponse({'status': 1})
    if reserves[0].status == 1:
        return JsonResponse({'status': 2})