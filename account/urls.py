import account.views
from django.conf.urls import url

urlpatterns = [
    url(r'^getincome/', account.views.getIncome, name='getIncome'),
    url(r'^newincome/', account.views.newIncome, name='newIncome'),
    url(r'^getexpense/', account.views.getExpense, name='getExpense'),
    url(r'^newexpense/', account.views.newExpense, name='newExpense'),
    url(r'^loanrequest/', account.views.newRequest, name='newRequest'),
    url(r'^response', account.views.getResponse, name='getResponse'),
]