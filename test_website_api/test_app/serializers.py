from rest_framework import serializers

from .models import Test1, Test2


class Test2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Test2
        fields = ['test2']


class Test1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Test1
        fields = ['test1']