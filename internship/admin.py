from django.contrib import admin

# Register your models here.
from internship.models import Schedule, Rule, Recommendation, Company

admin.site.register(Schedule)
admin.site.register(Rule)
admin.site.register(Recommendation)
admin.site.register(Company)
