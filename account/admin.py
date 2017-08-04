from django.contrib import admin

# Register your models here.
from account.models import Expense, LoanResponse, Income, LoanRequest

admin.site.register(Income)
admin.site.register(Expense)
admin.site.register(LoanRequest)
admin.site.register(LoanResponse)