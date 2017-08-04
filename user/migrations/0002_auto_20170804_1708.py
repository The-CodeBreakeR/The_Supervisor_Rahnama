# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-04 12:38
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('department', models.CharField(choices=[('CE', 'Computer Engineering'), ('CS', 'Computer Science'), ('IE', 'Industrial Engineering'), ('ME', 'Mechanical Engineering'), ('MA', 'Mathematics'), ('PH', 'Physics'), ('CH', 'Chemistry'), ('CI', 'Civil'), ('MN', 'Management'), ('EC', 'Economics'), ('LA', 'Language Center'), ('IS', 'Islamic Center'), ('SP', 'Sport Center')], max_length=2)),
                ('credits', models.IntegerField()),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='CourseInformation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.FloatField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.Course')),
            ],
        ),
        migrations.CreateModel(
            name='EducationalProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('major', models.CharField(choices=[('CE', 'Computer Engineering'), ('CS', 'Computer Science'), ('IE', 'Industrial Engineering'), ('ME', 'Mechanical Engineering'), ('MA', 'Mathematics'), ('PH', 'Physics'), ('CH', 'Chemistry'), ('CI', 'Civil'), ('MN', 'Management'), ('EC', 'Economics')], max_length=2)),
                ('entrance_year', models.IntegerField()),
                ('degree', models.CharField(choices=[('BSC', 'Bachelor'), ('MSC', 'Master'), ('PHD', 'Doctoral')], max_length=3)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PersonalProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='')),
                ('father_name', models.CharField(max_length=64)),
                ('birth_date', models.CharField(max_length=10)),
                ('birth_place', models.CharField(max_length=64)),
                ('national_id', models.CharField(max_length=10)),
                ('mobile_number', models.CharField(max_length=14)),
                ('marital_status', models.CharField(choices=[('S', 'Single'), ('M', 'Married')], max_length=1)),
                ('land_line_number', models.CharField(max_length=14)),
                ('address', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SemesterInformation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('semester', models.IntegerField()),
                ('education_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.EducationalProfile')),
            ],
        ),
        migrations.AddField(
            model_name='courseinformation',
            name='semester',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.SemesterInformation'),
        ),
    ]