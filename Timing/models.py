from django.db import models

# Create your models here.
class Alarm(models.Model):
    info = models.CharField(max_length=100)
    date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return str(self.name)

class Proposal(models.Model):
    info = models.CharField(max_length=100)
    date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return str(self.name)