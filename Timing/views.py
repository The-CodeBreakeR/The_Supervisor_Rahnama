from django.shortcuts import render
from datetime import datetime, date

import pytz
from Timing.models import Alarm,Proposal
from django.http import JsonResponse, Http404, response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import json

def responseMaker(items):
    response = {}
    if len(items) == 0:
        response = {'status': -1, 'message': "No Item Found"}
    if len(items) >= 1:
        response = {
            "status": 0,
            "items": [{'info': items[0].info}]
        }
        if len(items) == 1:
            return JsonResponse(response)
        i = 1
        while i < items.count():
            response['items'] = response['items'] + [{"items":[{'info': items[0].info}]}]
            i = i + 1
    return JsonResponse(response)

@csrf_exempt
def searchTiming(request):
    if request.method == 'POST':
        last_month = datetime.today() - timedelta(days=30)
        alarms = Alarm.objects.filter(date__gte=last_month)
        proposals = Proposal.objects.filter(date__gte=last_month)
        alarmsResponse = responseMaker(alarms)
        proposalsResponse = responseMaker(proposals)
        return JsonResponse({'alarms': alarmsResponse,'proposals': proposalsResponse})
    return JsonResponse({'status': -1})