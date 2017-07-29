import Tours.views
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Tours.views.searchTour, name='searchTour'),
    url(r'^(\d+)/', Tours.views.getTour, name='getTour')

]