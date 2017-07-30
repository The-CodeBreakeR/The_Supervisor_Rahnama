import Tours.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Tours.views.searchTour, name='searchTour'),
    url(r'^getTour/', Tours.views.getTour, name='getTour'),
    url(r'^reserve/', Tours.views.reserveTour, name='reserve'),

]