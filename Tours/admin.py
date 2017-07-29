from .models import Tour
from django.contrib import admin


# Register your models here.
class TourAdmin(admin.ModelAdmin):
    list_display = ['name', 'start_date', 'end_date', 'price', 'capacity']


admin.site.register(Tour, TourAdmin)