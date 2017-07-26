from datetime import datetime

import django
from user.models import User
from django.db import models


# Create your models here.

class Tour(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField(default=django.utils.timezone.now)
    end_date = models.DateField(default=django.utils.timezone.now)
    price = models.IntegerField()
    spec = models.TextField(max_length=2000)
    capacity = models.IntegerField()

    def __str__(self):
        return str(self.name)


class ReviewTour(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    tour_id = models.ForeignKey(Tour, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.now)
    text = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.pk)


class ReserveTour(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    tour_id = models.ForeignKey(Tour, on_delete=models.CASCADE, default=1)
    status = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.id)


class RequestForTour(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    tour_id = models.ForeignKey(Tour, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.now)
    status = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.id)


class Comments(models.Model):
    tour_id = models.ForeignKey(Tour, on_delete=models.CASCADE)
    comment_text = models.TextField(max_length=1000)

    def __str__(self):
        return str(self.id)