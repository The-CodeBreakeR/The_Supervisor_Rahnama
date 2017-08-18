import Scheduling.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Scheduling.views.searchScheduling, name='searchScheduling'),
    url(r'^all/', Scheduling.views.searchScheduling, name='searchScheduling'),
    url(r'^week/', Scheduling.views.weekScheduling, name='weekScheduling'),
    url(r'^today/', Scheduling.views.todayScheduling, name='todayScheduling'),
    url(r'^day/', Scheduling.views.dayScheduling, name='dayScheduling'),
    url(r'^hardDay/', Scheduling.views.hardDayScheduling, name='hardDayScheduling'),
    url(r'^month/', Scheduling.views.monthScheduling, name='monthScheduling'),
    url(r'^getScheduling/', Scheduling.views.getScheduling, name='getScheduling'),
    url(r'^request/', Scheduling.views.requestScheduling, name='request'),
]