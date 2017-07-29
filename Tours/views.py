import Tours
from Tours.models import Tour, ReserveTour
from django.http import JsonResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def searchTour(request):
    if request.method == 'POST':
        bodyParams = request.body.decode('utf-8').split('=')
        name = bodyParams[1]
        tour = Tour.objects.filter(name__contains=name)
        if len(tour) == 0:
            return JsonResponse({'status': "-1", 'message': "No Tour Found"})
        if len(tour) >= 1:
            response = {
                "status": 0,
                "tours": [{'id': str(tour[0].id), 'name': tour[0].name, 'start_time': str(tour[0].start_date),
                           'end_time': str(tour[0].end_date), 'price': str(tour[0].price)}]
            }
            if len(tour) == 1:
                print(response)
                return JsonResponse(response)
            i = 1
            while i < tour.count():
                response['tours'] = response['tours'] + [{'id': str(tour[i].id), 'name': tour[i].name, 'start_time': str(tour[i].start_date),
                           'end_time': str(tour[i].end_date), 'price': str(tour[i].price)}]
                i = i + 1
            return JsonResponse(response)

    return JsonResponse({'status': "0", 'message': "No Tour Found"})


def getTour(request, id):
    tour = Tour.objects.filter(id=id)
    print("hiop")
    if tour.count() == 0:
        return JsonResponse({'status': "-1", 'message': "No such post Found"})

    response = {
        "status": 0,
        "tour": {'id': str(tour[0].id), 'name': tour[0].name, 'start_time': str(tour[0].start_date),
                  'end_time': str(tour[0].end_date), 'price': str(tour[0].price), 'spec': str(tour[0].spec),
                  'capacity': str(tour[0].capacity)}
    }
    print(response)
    return JsonResponse(response)
    return JsonResponse({'status': "0", 'message': "No Tour Found"})


def reserveTour(request, id):
    tour = Tour.objects.filter(id=id)
    #to be complete
    std_id = 1
    if len(tour) == 0:
        return JsonResponse({'status': "-1", 'message': "No Tour Found"})

    if not tour[0].capacity == 0:
        tour[0].capacity = tour[0].capacity - 1
        tour[0].save()
        reserve = ReserveTour.objects.create()
        reserve.student_id = std_id
        reserve.tour_id = id
        reserve.status = 0
        reserve.save()
        return JsonResponse({'status': "0", 'message': "tour reserved"})
    else:
        return JsonResponse({'status': "0", 'message': "No Capacity for this Tour Found"})


def cancelReserve(request, id):
    # to be complete
    std_id = 1
    tour = Tour.objects.filter(id=id)
    reserve = ReserveTour.objects.filter(student_id=std_id, tour_id=id)
    if len(tour) == 0:
        return JsonResponse({'status': "-1", 'message': "No Tour Found"})

    if len(reserve) == 0:
        return JsonResponse({'status': "-1", 'message': "This reserve does not exist!"})
    tour[0].capacity = tour[0].capacity + 1
    tour[0].save()
    reserve[0].delete()
    return JsonResponse({'status': "0", 'message': "reserve canceled!"})


