# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-30 18:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accomm', '0002_auto_20170730_2302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='size',
            field=models.IntegerField(default=60),
        ),
    ]
