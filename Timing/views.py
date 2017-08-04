from django.shortcuts import render

import pytz
from Timing.models import Alarm,Proposal
from django.http import JsonResponse, Http404, response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import timedelta
import json

def responseMaker(items):
    response = {}
    if len(items) == 0:
        response = {'status': -1, 'items': []}
    if len(items) >= 1:
        response = {
            "status": 0,
            "items": [{'info': items[0].info,'date':items[0].date.timestamp()}]
        }
        if len(items) == 1:
            return response
        i = 1
        while i < items.count():
            response['items'] = response['items'] + [{"items":[{'info': items[i].info,'date':items[i].date.timestamp()}]}]
            i = i + 1
    return response

@csrf_exempt
def searchTiming(request):
    if request.method == 'POST':
        next_month = timezone.now().date() + timedelta(days=30)
        bodyParams = json.loads(request.body.decode('utf-8'))
        name = bodyParams['timingName']
        alarms = Alarm.objects.filter(info__contains=name,date__gte=timezone.now().today(),date__lte=next_month)
        proposals = Proposal.objects.filter(info__contains=name,date__gte=timezone.now().today(),date__lte=next_month)
        alarmsResponse = responseMaker(alarms)
        proposalsResponse = responseMaker(proposals)
        print("hoy  ", {'alarms': alarmsResponse,'proposals': proposalsResponse})
        return JsonResponse({'alarms': alarmsResponse,'proposals': proposalsResponse})
    return JsonResponse({'status': -1})