from .models import Tour, ReserveTour
from django.contrib import admin


# Register your models here.
class TourAdmin(admin.ModelAdmin):
    list_display = ['name', 'start_date', 'end_date', 'price', 'capacity']


admin.site.register(Tour, TourAdmin)


class ReserveAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'tour_id', 'status']


admin.site.register(ReserveTour, ReserveAdmin)