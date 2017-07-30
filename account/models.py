from datetime import datetime

import django
from user.models import User
from django.db import models


# Create your models here.

class Income(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    source = models.CharField(max_length=100)

    def __str__(self):
        return "id: " + str(self.id) + " - std: " + str(self.student_id) + \
               " - src: " + str(self.source) + " - amount: " + str(self.amount)

class Expense(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    destination = models.CharField(max_length=100)

    def __str__(self):
        return "id: " + str(self.id) + " - std: " + str(self.student_id) + \
               " - src: " + str(self.destination) + " - amount: " + str(self.amount)

class LoanRequest(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    purpose = models.CharField(max_length=100)

    def __str__(self):
        return "id: " + str(self.id) + " - std: " + str(self.student_id) + \
               " - src: " + str(self.purpose) + " - amount: " + str(self.amount)

class LoanResponse(models.Model):
    request_id = models.ForeignKey(LoanRequest, on_delete=models.CASCADE, default=1)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    answer = models.CharField(max_length=100)
    repayment_period = models.IntegerField()
    repayment_rate = models.IntegerField()

    def __str__(self):
        return "id: " + str(self.id) + " - std: " + str(self.student_id) + \
               " - req_id: " + str(self.request_id) + " - answer: " + str(self.answer)
