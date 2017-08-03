from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import User, PersonalProfile, EducationalProfile, SemesterInformation, CourseInformation
from .serializers import UserSerializer, PersonalProfileSerializer, EducationalProfileSerializer,\
    SemesterInformationSerializer, CourseInformationSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        name = token.user.first_name + ' ' + token.user.last_name
        return Response({'token': token.key, 'id': token.user_id, 'name': name})


class PersonalProfileViewSet(viewsets.ModelViewSet):
    queryset = PersonalProfile.objects.all()
    serializer_class = PersonalProfileSerializer


class EducationalProfileViewSet(viewsets.ModelViewSet):
    queryset = EducationalProfile.objects.all()
    serializer_class = EducationalProfileSerializer


class SemesterInformationViewSet(viewsets.ModelViewSet):
    queryset = SemesterInformation.objects.all()
    serializer_class = SemesterInformationSerializer


class CourseInformationViewSet(viewsets.ModelViewSet):
    queryset = CourseInformation.objects.all()
    serializer_class = CourseInformationSerializer
