from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.models import ShortedUrl
from api.serializers import UrlSerializer

# Create your views here.
def url_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        urls = ShortedUrl.objects.all()
        serializer = UrlSerializer(urls, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UrlSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)