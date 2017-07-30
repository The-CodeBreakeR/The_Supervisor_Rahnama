import accomm.views
from django.conf.urls import url

urlpatterns = {
    url(r'^rules/', accomm.views.showRules, name='showRules'),
    url(r'^places/', accomm.views.availablePlaces, name='availablePlaces'),
    url(r'^reserve/(\d+)', accomm.views.reserveAPlace, name='reserveAPlace'),
}