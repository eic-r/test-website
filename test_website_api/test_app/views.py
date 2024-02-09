from rest_framework import viewsets

from .models import Test1
from .serializers import Test1Serializer


class Test1ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Test1.objects.all()
    serializer_class = Test1Serializer