from datetime import datetime

import django
from user.models import User
from django.db import models


# Create your models here.

class Scheduling(models.Model):
    name = models.CharField(max_length=100)
    end_date = models.DateTimeField(default=django.utils.timezone.now)
    capasity = models.IntegerField(default=1)
    info = models.TextField(max_length=2000,default='')

    def __str__(self):
        return str(self.name)


class ReviewScheduling(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    scheduling_id = models.ForeignKey(Scheduling, on_delete=models.CASCADE, default=1)
    date = models.DateTimeField(default=datetime.now)
    text = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.pk)


class ReserveScheduling(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    scheduling_id = models.ForeignKey(Scheduling, on_delete=models.CASCADE, default=1)
    status = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.id)


class RequestForScheduling(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    textRequest = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.id)


class Comments(models.Model):
    schedulingId = models.ForeignKey(Scheduling, on_delete=models.CASCADE)
    studentId = models.ForeignKey(User, on_delete=models.CASCADE, default=1,related_name='+')
    comment_text = models.TextField(max_length=1000)

    def __str__(self):
        return str(self.id)