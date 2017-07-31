from rest_framework.parsers import JSONParser
from accomm.models import AccommPrinciple, Accommodation
from accomm.serializers import AccommodationSerializer, AccommPrincipleSerializer
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from user.views import CustomObtainAuthToken

def showRules(request):
    serializer = AccommPrincipleSerializer(AccommPrinciple.objects.all(), many=True)
    return JsonResponse(serializer.data, safe=False)

def availablePlaces(request):
    serializer = AccommodationSerializer(
        Accommodation.objects.filter(reserved_by__isnull=True), many=True)
    return JsonResponse(serializer.data, safe=False)

def reserveAPlace(request):
    placeid = bodyParams['placeID']
    token = Token.objects.get(key=bodyParams['token'])
    stdid = token.user
    place = Accommodation.objects.filter(id=placeid, reserved_by__isnull=True)
    if len(place) == 0:
        return JsonResponse({'status': -1})
    Accommodation.objects.filter(id=placeid).update(reserved_by=stdid)
    return JsonResponse({'status': 0})