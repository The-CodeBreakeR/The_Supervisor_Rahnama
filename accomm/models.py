from datetime import datetime

import django
from user.models import User
from django.db import models

# Create your models here.

class AccommPrinciple(models.Model):
    date = models.DateField(default=datetime.now)
    description = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.description)

class Accommodation(models.Model):
    size = models.IntegerField(default=60)
    type = models.TextField(max_length=30)
    location = models.TextField(max_length=2000)
    cost = models.IntegerField(default=200)
    contracted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                      blank=True, related_name='contracted')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    reserved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                    blank=True, related_name='reserved')

    def __str__(self):
        return str(self.id)