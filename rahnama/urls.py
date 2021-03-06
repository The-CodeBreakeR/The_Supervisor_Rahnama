"""rahnama URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import Tours.url
import Skill.url
import Timing.urls
import Scheduling.urls
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers

from user.views import UserViewSet, CustomObtainAuthToken, PersonalProfileViewSet, EducationalProfileViewSet,\
    SemesterInformationViewSet, CourseInformationViewSet, CourseViewSet

from internship.views import ScheduleViewSet, RuleViewSet, RecommendationViewSet, CompanyViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'personal_profile', PersonalProfileViewSet)
router.register(r'educational_profile', EducationalProfileViewSet)
router.register(r'semester_info_profile', SemesterInformationViewSet)
router.register(r'course_info_profile', CourseInformationViewSet)
router.register(r'course', CourseViewSet)
router.register(r'internship_schedule', ScheduleViewSet)
router.register(r'internship_rule', RuleViewSet)
router.register(r'internship_recommendation', RecommendationViewSet)
router.register(r'internship_company', CompanyViewSet)



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', CustomObtainAuthToken.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),
    url(r'^accounting/', include('account.urls')),
    url(r'^accommodation/', include('accomm.urls')),
    url(r'^tours/', include(Tours.url)),
    url(r'^timing/', include(Timing.urls)),
    url(r'^scheduling/', include(Scheduling.urls)),
    url(r'^skill/', include(Skill.url)),
    url(r'^.*$', TemplateView.as_view(template_name='index.html')),

]
