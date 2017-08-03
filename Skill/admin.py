from Skill.models import Skill, QuestionAnswer
from django.contrib import admin


class SkillAdmin(admin.ModelAdmin):
    list_display = ['typing_skill', 'coding_skill', 'presentation_skill', 'reading_skill']


admin.site.register(Skill, SkillAdmin)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'date', 'question', 'answer']


admin.site.register(QuestionAnswer, QuestionAdmin)