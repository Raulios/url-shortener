from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from api.models import ShortedUrl
from api.serializers import UrlSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def url_list(request, format=None):
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

@api_view(['POST'])
def create_short_url(request):
	data = request.data
	random_code = generate_random_code()
	
	while ShortedUrl.objects.filter(short_url=random_code).exists():
	    random_code = generate_random_code()

	urlShortener.objects.create(
	    original_url=data['original_url'],
	    short_url="http://localhost:8000/"+random_code
	)
	return Response({'original_url': original_url, 'short_url': short_url})

def redirect_url(request, short_url):
    try:
        obj = ShortedUrl.objects.get(short_url=short_url)
    except ShortedUrl.DoesNotExist:
        obj = None

    if obj is not None:
        return redirect(obj.original_url)