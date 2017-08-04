# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-30 13:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='expense_id',
        ),
        migrations.RemoveField(
            model_name='income',
            name='income_id',
        ),
        migrations.RemoveField(
            model_name='loanrequest',
            name='request_id',
        ),
        migrations.RemoveField(
            model_name='loanresponse',
            name='response_id',
        ),
        migrations.AlterField(
            model_name='expense',
            name='amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='income',
            name='amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='loanrequest',
            name='amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='loanresponse',
            name='repayment_period',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='loanresponse',
            name='repayment_rate',
            field=models.IntegerField(default=0),
        ),
    ]