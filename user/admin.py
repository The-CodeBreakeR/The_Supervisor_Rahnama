from .models import PersonalProfile, EducationalProfile, Course, SemesterInformation, CourseInformation, User
from django.contrib import admin

admin.site.register(User)
admin.site.register(PersonalProfile)
admin.site.register(EducationalProfile)
admin.site.register(Course)
admin.site.register(CourseInformation)
admin.site.register(SemesterInformation)
