from .models import Scheduling, ReserveScheduling, RequestForScheduling, Comments
from django.contrib import admin


# Register your models here.
class SchedulingAdmin(admin.ModelAdmin):
    list_display = ['name', 'end_date', 'capasity']


admin.site.register(Scheduling, SchedulingAdmin)


class ReserveAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'scheduling_id', 'status']


admin.site.register(ReserveScheduling, ReserveAdmin)


class RequestAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'textRequest']


admin.site.register(RequestForScheduling, RequestAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ['schedulingId', 'studentId', 'comment_text']


admin.site.register(Comments, CommentAdmin)