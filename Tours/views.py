from Tours.models import Tour
from django.shortcuts import render


# Create your views here.

def searchTour(request):
    name = "shomal"
    tour = Tour.objects.filter(name__contains=name)
    response = {
        "status": 0,
        "posts": [{'id': str(tour[0].id), 'name': tour[0].name, 'start_time': str(tour[0].start_date),
                   'end_time': str(tour[0].end_date), 'price': str(tour[0].price), 'spec':tour[0].spec}]
    }
    while i < posts.count():
        response['posts'] = response['posts'] + [
            {'id': str(posts[i].id), 'title': posts[i].title, 'summery': posts[i].summary,
             'datetime': str(posts[i].date)}]
        i = i + 1
