from rest_framework import serializers
from .models import Accommodation, AccommPrinciple


class AccommPrincipleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommPrinciple
        fields = '__all__'

class AccommodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accommodation
        fields = '__all__'
