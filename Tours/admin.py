from .models import Tour, ReserveTour, RequestForTour, Comments
from django.contrib import admin


# Register your models here.
class TourAdmin(admin.ModelAdmin):
    list_display = ['name', 'start_date', 'end_date', 'price', 'capacity']


admin.site.register(Tour, TourAdmin)


class ReserveAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'tour_id', 'date', 'status']


admin.site.register(ReserveTour, ReserveAdmin)


class RequestAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'textRequest']


admin.site.register(RequestForTour, RequestAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ['tourId', 'studentId', 'comment_text']


admin.site.register(Comments, CommentAdmin)