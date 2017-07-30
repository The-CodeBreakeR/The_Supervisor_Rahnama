import Tours.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Tours.views.searchTour, name='searchTour'),
    url(r'^getTour/', Tours.views.getTour, name='getTour'),
    url(r'^reserve/', Tours.views.reserveTour, name='reserve'),
    url(r'^status/', Tours.views.statusResult, name='status'),
    url(r'^payment/', Tours.views.payTour, name='payTour'),
    url(r'^decline/', Tours.views.cancelReserve, name='decline'),
    url(r'^request/', Tours.views.requestTour, name='request'),
]