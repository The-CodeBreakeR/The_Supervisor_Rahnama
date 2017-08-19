from rest_framework.parsers import JSONParser
from accomm.models import AccommPrinciple, Accommodation
from accomm.serializers import AccommodationSerializer, AccommPrincipleSerializer
from rest_framework.authtoken.models import Token
from datetime import datetime, date
from user.views import CustomObtainAuthToken
from django.shortcuts import render
import json
from django.http import JsonResponse, Http404, response
from django.views.decorators.csrf import csrf_exempt
import pytz

@csrf_exempt
def showRules(request):
    rules = AccommPrinciple.objects.all()
    if len(rules) == 0:
        return JsonResponse({'status': -1, 'message': "No rule found"})
    else:
        response = {
            "status": 0,
            "rules": [{'id': rules[0].id, 'date': rules[0].date,
                       'description': rules[0].description}]
        }
        if len(rules) == 1:
            return JsonResponse(response)
        i = 1
        while i < rules.count():
            response['rules'] = response['rules'] + [
                {'id': rules[i].id, 'date': rules[i].date,
                 'description': rules[i].description}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def availablePlaces(request):
    places = Accommodation.objects.filter(reserved_by__isnull=True)
    if len(places) == 0:
        return JsonResponse({'status': -1, 'message': "No place found"})
    else:
        response = {
            "status": 0,
            "places": [{'id': places[0].id, 'size': places[0].size, 'type': places[0].type,
                        'location': places[0].location, 'cost': places[0].cost,
                        'end_date': places[0].end_date}]
        }
        if len(places) == 1:
            return JsonResponse(response)
        i = 1
        while i < places.count():
            response['places'] = response['places'] + [
                {'id': places[i].id, 'size': places[i].size, 'type': places[i].type,
                 'location': places[i].location, 'cost': places[i].cost,
                 'end_date': places[i].end_date}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def reserveAPlace(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    placeid = bodyParams['placeID']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    place = Accommodation.objects.filter(id=placeid, reserved_by__isnull=True)
    if len(place) == 0:
        return JsonResponse({'status': -1})
    Accommodation.objects.filter(id=placeid).update(reserved_by=stdid)
    return JsonResponse({'status': 0})

@csrf_exempt
def reservedPlaces(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    places = Accommodation.objects.filter(reserved_by=stdid)
    if len(places) == 0:
        return JsonResponse({'status': -1, 'message': "No place found"})
    else:
        response = {
            "status": 0,
            "places": [{'id': places[0].id, 'size': places[0].size, 'type': places[0].type,
                        'location': places[0].location, 'cost': places[0].cost,
                        'end_date': places[0].end_date}]
        }
        if len(places) == 1:
            return JsonResponse(response)
        i = 1
        while i < places.count():
            response['places'] = response['places'] + [
                {'id': places[i].id, 'size': places[i].size, 'type': places[i].type,
                 'location': places[i].location, 'cost': places[i].cost,
                 'end_date': places[i].end_date}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def contractedPlaces(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    places = Accommodation.objects.filter(contracted_by=stdid)
    if len(places) == 0:
        return JsonResponse({'status': -1, 'message': "No place found"})
    else:
        response = {
            "status": 0,
            "places": [{'id': places[0].id, 'size': places[0].size, 'type': places[0].type,
                        'location': places[0].location, 'cost': places[0].cost,
                        'end_date': places[0].end_date, 'start_date': places[0].start_date}]
        }
        if len(places) == 1:
            return JsonResponse(response)
        i = 1
        while i < places.count():
            response['places'] = response['places'] + [
                {'id': places[i].id, 'size': places[i].size, 'type': places[i].type,
                 'location': places[i].location, 'cost': places[i].cost,
                 'end_date': places[i].end_date, 'start_date': places[0].start_date}]
            i = i + 1
        return JsonResponse(response)

@csrf_exempt
def cancelReserve(request):
    bodyParams = json.loads(request.body.decode('utf-8'))
    placeid = bodyParams['placeID']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    Accommodation.objects.filter(id=placeid).update(reserved_by=None)
    return JsonResponse({'status': 0})