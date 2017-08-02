from datetime import datetime

import pytz
from Skill.models import Skill, QuestionAnswer
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.authtoken.models import Token


@csrf_exempt
def getSkill(request):
    bodyParams = json.loads(request.body)
    id = bodyParams['skillId']
    current_skill = Skill.objects.get(id="1")
    if id == 2:
        response = {
            "status": 0,
            "skill": current_skill.presentation_skill}
    elif id == 1:
        response = {
            "status": 0,
            "skill": current_skill.coding_skill}
    elif id == 3:
        response = {
            "status": 0,
            "skill": current_skill.reading_skill}
    elif id == 4:
        response = {
            "status": 0,
            "skill": current_skill.typing_skill}

    print(response)
    return JsonResponse(response)

@csrf_exempt
def question(request):
    bodyParams = json.loads(request.body)
    question_text = bodyParams['question']
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    question = QuestionAnswer.objects.create()
    question.student_id = user
    question.question = question_text
    question.date =datetime.utcnow().replace(tzinfo=pytz.UTC)
    question.save()
    return JsonResponse({'status': 0})



@csrf_exempt
def questionAnswer(request):
    bodyParams = json.loads(request.body)
    token = Token.objects.get(key=bodyParams['token'])
    user = token.user
    question = QuestionAnswer.objects.filter(student_id=user)
    if question.count() == 0:
        response = {
            "status": 1,
            "questions": [{}]}
    else:
        response = {
            "status": 0,
            "questions": [{'date': str(question[0].date),
                          'question': str(question[0].question),
                          'answer': str(question[0].answer)}]}
        print(response)
        if question.count() == 1:
            print(response)
            return JsonResponse(response)
        i = 1
        while i < question.count():
            response['questions'] = response['questions'] + [
                {'date': str(question[i].date),
                 'question': str(question[i].question),
                 'answer': str(question[i].answer)}]
            i = i + 1
    print(response)
    return JsonResponse(response)
