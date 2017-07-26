from django.db import models

# Create your models here.

from datetime import datetime

import user
from django.db import models


# Create your models here.

class Skill(models.Model):
    name = models.CharField(max_length=100)
    spec = models.CharField(max_length=300)

    def __str__(self):
        return str(self.name)


class QuestionAnswer(models.Model):
    student_id = models.ForeignKey(user, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.now)
    question = models.TextField(max_length=2000)
    answer = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.pk)
