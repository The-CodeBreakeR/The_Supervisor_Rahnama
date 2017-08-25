from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    pass


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class PersonalProfile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    user = models.OneToOneField(User)
    photo = models.ImageField()
    father_name = models.CharField(max_length=64)
    birth_date = models.CharField(max_length=10)
    birth_place = models.CharField(max_length=64)
    national_id = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=14)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    land_line_number = models.CharField(max_length=14)
    address = models.TextField()

    def __str__(self):
        return str(self.user)


class EducationalProfile(models.Model):
    MAJOR_CHOICES = (
        ('CE', 'Computer Engineering'),
        ('CS', 'Computer Science'),
        ('IE', 'Industrial Engineering'),
        ('ME', 'Mechanical Engineering'),
        ('MA', 'Mathematics'),
        ('PH', 'Physics'),
        ('CH', 'Chemistry'),
        ('CI', 'Civil'),
        ('MN', 'Management'),
        ('EC', 'Economics'),
    )

    DEGREE_CHOICES = (
        ('BSC', 'Bachelor'),
        ('MSC', 'Master'),
        ('PHD', 'Doctoral'),
    )

    user = models.OneToOneField(User)
    major = models.CharField(max_length=2, choices=MAJOR_CHOICES)
    entrance_year = models.IntegerField()
    degree = models.CharField(max_length=3, choices=DEGREE_CHOICES)

    def __str__(self):
        return str(self.user)


class Course(models.Model):
    DEPARTMENT_CHOICES = (
        ('CE', 'Computer Engineering'),
        ('CS', 'Computer Science'),
        ('IE', 'Industrial Engineering'),
        ('ME', 'Mechanical Engineering'),
        ('MA', 'Mathematics'),
        ('PH', 'Physics'),
        ('CH', 'Chemistry'),
        ('CI', 'Civil'),
        ('MN', 'Management'),
        ('EC', 'Economics'),
        ('LA', 'Language Center'),
        ('IS', 'Islamic Center'),
        ('SP', 'Sport Center'),
    )

    id = models.IntegerField(primary_key=True)
    department = models.CharField(max_length=2, choices=DEPARTMENT_CHOICES)
    credits = models.IntegerField()
    name = models.CharField(max_length=64)

    def __str__(self):
        return '[' + self.department + '] ' + str(self.id) + ' - ' + self.name + ' (' + str(self.credits) + ')'


class SemesterInformation(models.Model):
    education_profile = models.ForeignKey(EducationalProfile)
    year = models.IntegerField()
    semester = models.IntegerField()

    def __str__(self):
        return str(self.education_profile) + ' - ' + str(self.year) + ':' + str(self.semester)


class CourseInformation(models.Model):
    semester = models.ForeignKey(SemesterInformation)
    course = models.ForeignKey(Course)
    grade = models.FloatField()

    def __str__(self):
        return str(self.semester) + ' - ' + str(self.course) + ' - ' + str(self.grade)
