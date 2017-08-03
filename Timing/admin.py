from django.contrib import admin
from .models import Alarm , Proposal
# Register your models here.
class AlarmAd(admin.ModelAdmin):
    list_display = ['info', 'date']

admin.site.register(Alarm, AlarmAd)

class ProposalAd(admin.ModelAdmin):
    list_display = ['info', 'date']

admin.site.register(Proposal, ProposalAd)