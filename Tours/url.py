import Tours.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Tours.views.searchTour, name='searchTour'),
    url(r'^getTour/(\d+)', Tours.views.getTour, name='getTour')

]