from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from bson import json_util
from .serializers import UserSerializer

import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017') #change this to correct database connection string
dbname = client['test-website']
collection = dbname['test']

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_tests(request):
    name = request.GET.get('name')
    if name:
        tests = json_util.dumps(collection.find_one({"name": name}))
    else:
        tests = json_util.dumps(list(collection.find({})))
    return JsonResponse(tests, safe=False)

@login_required
@api_view(['PUT'])
def put_test(request):
    test_data = JSONParser().parse(request)
    collection.insert_one(test_data)
    return JsonResponse(json_util.dumps(test_data), safe=False)

@login_required
@api_view(['DELETE'])
def delete_test(request):
    test_data = JSONParser().parse(request)
    collection.delete_one(test_data)
    return JsonResponse({'message': 'Test was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)