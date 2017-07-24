import Tours
from django.conf.urls import url

urlpatterns = [
    url(r'^search/', Tours.views.searchTour, name='showPosts'),


]