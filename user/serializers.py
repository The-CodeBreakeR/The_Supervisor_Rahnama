from rest_framework import serializers
from .models import User, PersonalProfile, EducationalProfile, SemesterInformation, CourseInformation


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff', 'is_superuser',
                  'is_active', 'date_joined',)
        read_only_fields = ('id', 'is_staff', 'is_superuser', 'is_active', 'date_joined',)
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


class PersonalProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PersonalProfile


class EducationalProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EducationalProfile


class SemesterInformationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SemesterInformation


class CourseInformationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CourseInformation
