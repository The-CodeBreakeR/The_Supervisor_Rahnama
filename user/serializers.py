from rest_framework import serializers
from .models import User, Course, PersonalProfile, EducationalProfile, SemesterInformation, CourseInformation


class PersonalProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PersonalProfile
        exclude = ('photo',)


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseInformationSerializer(serializers.HyperlinkedModelSerializer):
    course_info = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = CourseInformation
        fields = '__all__'


class SemesterInformationSerializer(serializers.HyperlinkedModelSerializer):
    courses_info = CourseInformationSerializer(read_only=True, many=True, source='courseinformation_set')

    class Meta:
        model = SemesterInformation
        fields = '__all__'


class EducationalProfileSerializer(serializers.HyperlinkedModelSerializer):
    semesters_info = SemesterInformationSerializer(read_only=True, many=True, source='semesterinformation_set')

    class Meta:
        model = EducationalProfile
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    personal_profile = PersonalProfileSerializer(source='personalprofile', read_only=True)
    educational_profile = EducationalProfileSerializer(source='educationalprofile', read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'is_staff', 'is_superuser', 'is_active', 'date_joined', 'groups',
                            'user_permissions', 'last_login')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User()
        user.set_password(validated_data['password'])
        validated_data['password'] = user.password
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            del validated_data['password']
        return super(UserSerializer, self).update(instance, validated_data)
