# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-03 20:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Scheduling', '0003_auto_20170804_0014'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduling',
            name='info',
            field=models.TextField(default='', max_length=2000),
        ),
    ]
