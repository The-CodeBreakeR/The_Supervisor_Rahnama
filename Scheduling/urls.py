import Scheduling.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Scheduling.views.searchScheduling, name='searchScheduling'),
    url(r'^newScheduling/', Scheduling.views.newScheduling, name='newScheduling'),
    url(r'^week/', Scheduling.views.weekScheduling, name='weekScheduling'),
    url(r'^today/', Scheduling.views.todayScheduling, name='todayScheduling'),
    url(r'^hardDay/', Scheduling.views.hardDayScheduling, name='hardDayScheduling'),
    url(r'^month/', Scheduling.views.monthScheduling, name='monthScheduling'),
    url(r'^getScheduling/', Scheduling.views.getScheduling, name='getScheduling'),
    url(r'^status/', Scheduling.views.statusResult, name='status'),
    url(r'^decline/', Scheduling.views.cancelReserve, name='decline'),
    url(r'^request/', Scheduling.views.requestScheduling, name='request'),
]