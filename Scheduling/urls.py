import Scheduling.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Scheduling.views.searchScheduling, name='searchScheduling'),
    url(r'^getScheduling/', Scheduling.views.getScheduling, name='getScheduling'),
    url(r'^reserve/', Scheduling.views.reserveScheduling, name='reserve'),
    url(r'^status/', Scheduling.views.statusResult, name='status'),
    url(r'^payment/', Scheduling.views.payScheduling, name='payScheduling'),
    url(r'^decline/', Scheduling.views.cancelReserve, name='decline'),
    url(r'^request/', Scheduling.views.requestScheduling, name='request'),
]