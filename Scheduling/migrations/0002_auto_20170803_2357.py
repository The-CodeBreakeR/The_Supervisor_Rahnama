# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-03 19:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Scheduling', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scheduling',
            name='price',
        ),
        migrations.RemoveField(
            model_name='scheduling',
            name='spec',
        ),
        migrations.RemoveField(
            model_name='scheduling',
            name='start_date',
        ),
    ]