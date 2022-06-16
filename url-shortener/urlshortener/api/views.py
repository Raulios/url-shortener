from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from api.models import ShortedUrl
from api.serializers import UrlSerializer
from api.utils.codegenerator import generate_random_code

@api_view(['GET', 'POST'])
def url_list(request, format=None):
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

@api_view(['POST'])
def create_short_url(request):
	data = request.data
	random_code = generate_random_code()
	
	while ShortedUrl.objects.filter(short_url="http://localhost:8000/"+random_code).exists():
	    random_code = generate_random_code()

	original_url = data['original_url']
	short_url = "http://localhost:8000/"+random_code

	ShortedUrl.objects.create(
	    original_url=original_url,
	    short_url=short_url
	)
	return Response({'original_url': original_url, 'short_url': short_url})

def redirect_url(request, short_url):
	print(request)
	print(short_url)
	
	try:
	    obj = ShortedUrl.objects.get(short_url="http://localhost:8000/"+short_url)
	except ShortedUrl.DoesNotExist:
	    obj = None

	if obj is not None:
	    return redirect(obj.original_url)