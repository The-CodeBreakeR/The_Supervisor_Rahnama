from datetime import datetime

import django
from user.models import User
from django.db import models

# Create your models here.

class AccommPrinciple(models.Model):
    rule_id = models.IntegerField()
    date = models.DateField(default=datetime.now)
    description = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.description)