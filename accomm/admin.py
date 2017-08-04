from django.contrib import admin

# Register your models here.
from accomm.models import AccommPrinciple, Accommodation

admin.site.register(Accommodation)
admin.site.register(AccommPrinciple)
