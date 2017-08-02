from django.db import models
from user.models import User

# Create your models here.

from datetime import datetime

import user
from django.db import models


# Create your models here.

class Skill(models.Model):
    typing_skill = models.TextField(max_length=2000)
    coding_skill = models.TextField(max_length=2000)
    presentation_skill = models.TextField(max_length=2000)
    reading_skill = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.id)


class QuestionAnswer(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.now)
    question = models.TextField(max_length=2000)
    answer = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.pk)