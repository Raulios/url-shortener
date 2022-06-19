from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from api.models import ShortenedUrl
from api.serializers import ShortenedUrlSerializer
from api.utils.codegenerator import generate_random_code
from django.conf import settings

@api_view(['GET'])
def url_list(request, format=None):
    urls = ShortenedUrl.objects.all()
    serializer = ShortenedUrlSerializer(urls, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def create_short_url(request):
	data = request.data
	random_code = generate_random_code()
	
	while ShortenedUrl.objects.filter(short_url=settings.ROOT_URL + random_code).exists():
	    random_code = generate_random_code()

	original_url = data['original_url']
	short_url = settings.ROOT_URL + random_code

	ShortenedUrl.objects.create(
	    original_url=original_url,
	    short_url=short_url
	)
	return Response({'original_url': original_url, 'short_url': short_url})

def redirect_url(request, short_url):
	print(request)
	print(short_url)

	try:
	    obj = ShortenedUrl.objects.get(short_url= settings.ROOT_URL +short_url)
	except ShortenedUrl.DoesNotExist:
	    obj = None

	if obj is not None:
	    return redirect(obj.original_url)