from rest_framework import viewsets
from .models import AccommPrinciple, Accommodation
from .serializers import AccommodationSerializer, AccommPrincipleSerializer


class AccommodationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Accommodation.objects.all().order_by('acc_id')
    serializer_class = AccommodationSerializer

class AccommPrincipleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AccommPrinciple.objects.all().order_by('rule_id')
    serializer_class = AccommPrincipleSerializer
