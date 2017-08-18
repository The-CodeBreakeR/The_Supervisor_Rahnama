import accomm.views
from django.conf.urls import url

urlpatterns = [
    url(r'^rules/', accomm.views.showRules, name='showRules'),
    url(r'^places/', accomm.views.availablePlaces, name='availablePlaces'),
    url(r'^reserve/', accomm.views.reserveAPlace, name='reserveAPlace'),
    url(r'^resplaces/', accomm.views.reservedPlaces, name='reservedPlaces'),
    url(r'^conplaces/', accomm.views.contractedPlaces, name='contractedPlaces'),
]