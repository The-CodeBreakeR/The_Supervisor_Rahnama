from rest_framework.parsers import JSONParser
from accomm.models import AccommPrinciple, Accommodation
from accomm.serializers import AccommodationSerializer, AccommPrincipleSerializer
from django.http import JsonResponse

def showRules(request):
    serializer = AccommPrincipleSerializer(AccommPrinciple.objects.all(), many=True)
    return JsonResponse(serializer.data, safe=False)

def availablePlaces(request):
    serializer = AccommodationSerializer(
        Accommodation.objects.filter(reserved_by__isnull=True), many=True)
    return JsonResponse(serializer.data, safe=False)

def reserveAPlace(request, id):
    stdid = 1 ###
    Accommodation.objects.filter(id=id).update(reserved_by=stdid)
    serializer = AccommodationSerializer(Accommodation.objects.filter(id=id), many=True)
    return JsonResponse(serializer.data, safe=False)