import Scheduling.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Scheduling.views.searchTour, name='searchTour'),
    url(r'^getTour/', Scheduling.views.getTour, name='getTour'),
    url(r'^reserve/', Scheduling.views.reserveTour, name='reserve'),
    url(r'^status/', Scheduling.views.statusResult, name='status'),
    url(r'^payment/', Scheduling.views.payTour, name='payTour'),
    url(r'^decline/', Scheduling.views.cancelReserve, name='decline'),
    url(r'^request/', Scheduling.views.requestTour, name='request'),
]