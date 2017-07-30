from rest_framework import serializers
from .models import Accommodation, AccommPrinciple


class AccommPrincipleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommPrinciple
        fields = ('id', 'date', 'description')

class AccommodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accommodation
        fields = ('id', 'size', 'type', 'location')
