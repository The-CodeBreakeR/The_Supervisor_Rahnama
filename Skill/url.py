import Skill.views
from django.conf.urls import url

urlpatterns = [
    url(r'^getSkill/', Skill.views.getSkill, name='getSkill'),
    url(r'^question/', Skill.views.question, name='question'),
    url(r'^getQuestion/', Skill.views.questionAnswer, name='questionAnswer'),
]