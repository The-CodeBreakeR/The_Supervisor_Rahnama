# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-25 11:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20170815_2217'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personalprofile',
            name='marital_status',
        ),
        migrations.AddField(
            model_name='personalprofile',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=1),
        ),
    ]
