from django.shortcuts import render
from datetime import datetime

import django
from user.models import User
from django.db import models

# Create your views here.


class Schedule(models.Model):
    date = models.DateField(default=datetime.now)
    event = models.TextField(max_length=2000)

    def __str__(self):
        return "date: " + str(self.date) + " - event: " + str(self.event)


class Rule(models.Model):
    description = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.description)


class Recommendation(models.Model):
    description = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.description)


class Company(models.Model):
    field = models.TextField(max_length=2000)
    type = models.TextField(max_length=2000)
    name = models.TextField(max_length=2000)
    description = models.TextField(max_length=2000)
    contactInfo = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.name)