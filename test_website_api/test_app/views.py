from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import status
from bson import json_util

import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017') #change this to correct database connection string
dbname = client['test-website']
collection = dbname['test']

@api_view(['GET'])
def get_tests(request):
    name = request.GET.get('name')
    if name:
        tests = json_util.dumps(collection.find_one({"name": name}))
    else:
        tests = json_util.dumps(list(collection.find({})))
    return JsonResponse(tests, safe=False)

@api_view(['PUT'])
def put_test(request):
    test_data = JSONParser().parse(request)
    collection.insert_one(test_data)
    return JsonResponse(json_util.dumps(test_data), safe=False)

@api_view(['DELETE'])
def delete_test(request):
    test_data = JSONParser().parse(request)
    collection.delete_one(test_data)
    return JsonResponse({'message': 'Test was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)