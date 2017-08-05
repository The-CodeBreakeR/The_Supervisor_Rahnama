from django.db import models
from datetime import datetime

import django
from user.models import User
from django.db import models
# Create your models here.
class Alarm(models.Model):
    info = models.CharField(max_length=100)
    date = models.DateTimeField()

    def __str__(self):
        return str(self.info)

class Proposal(models.Model):
    info = models.CharField(max_length=100)
    date = models.DateTimeField()

    def __str__(self):
        return str(self.info)