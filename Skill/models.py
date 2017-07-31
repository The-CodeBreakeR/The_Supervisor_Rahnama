from django.db import models
from user.models import User

# Create your models here.

from datetime import datetime

import user
from django.db import models


# Create your models here.

class Skill(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    typing_skill = models.IntegerField()
    coding_skill = models.IntegerField()
    presentation_skill = models.IntegerField()
    reading_skill = models.IntegerField()

    def __str__(self):
        return str(self.name)


class QuestionAnswer(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.now)
    question = models.TextField(max_length=2000)
    answer = models.TextField(max_length=2000)

    def __str__(self):
        return str(self.pk)
