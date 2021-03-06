# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 16:43
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expense_id', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('destination', models.CharField(max_length=100)),
                ('student_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Income',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('income_id', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('source', models.CharField(max_length=100)),
                ('student_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LoanRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_id', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('purpose', models.CharField(max_length=100)),
                ('student_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LoanResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response_id', models.IntegerField()),
                ('answer', models.CharField(max_length=100)),
                ('repayment_period', models.IntegerField(null=True)),
                ('repayment_rate', models.IntegerField(null=True)),
                ('request_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='account.LoanRequest')),
                ('student_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
