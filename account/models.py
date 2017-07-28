from datetime import datetime

import django
from user.models import User
from django.db import models


# Create your models here.

class Income(models.Model):
    income_id = models.IntegerField(primary_key=True)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    source = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)

class Expense(models.Model):
    expense_id = models.IntegerField(primary_key=True)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    destination = models.CharField(max_length=100)

class LoanRequest(models.Model):
    request_id = models.IntegerField(primary_key=True)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.IntegerField()
    purpose = models.CharField(max_length=100)

class LoanResponse(models.Model):
    response_id = models.IntegerField(primary_key=True)
    request_id = models.ForeignKey(LoanRequest, on_delete=models.CASCADE, default=1)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    answer = models.CharField(max_length=100)
    repayment_period = models.IntegerField(null=True)
    repayment_rate = models.IntegerField(null=True)
