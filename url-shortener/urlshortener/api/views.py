from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from api.models import ShortenedUrl, ShortenedUrlStatPerDay
from api.serializers import ShortenedUrlSerializer, ShortenedUrlStatPerDaySerializer
from api.utils.codegenerator import generate_random_code
from django.conf import settings
import datetime

@api_view(['GET'])
def url_list(request, format=None):
    urls = ShortenedUrl.objects.all()
    serializer = ShortenedUrlSerializer(urls, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def url_stats_list(request, pk, format=None):
	url_stats = ShortenedUrlStatPerDay.objects.filter(shortened_url_id=pk)
	serializer = ShortenedUrlStatPerDaySerializer(url_stats, many=True)
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
	try:
	    url = ShortenedUrl.objects.get(short_url= settings.ROOT_URL + short_url)
	except ShortenedUrl.DoesNotExist:
	    url = None

	if url is not None:
		print(url.pk)
		print(datetime.date.today())

		stats = ShortenedUrlStatPerDay.objects.filter(shortened_url_id=url.pk, date=datetime.date.today())
		print(stats)

		if stats.exists():
			stats.update(number_of_clicks=stats[0].number_of_clicks+1)

		else:
			print('holi')
			ShortenedUrlStatPerDay.objects.create(date=datetime.date.today(), shortened_url_id=url.pk)

		return redirect(url.original_url)

@api_view(['DELETE'])
def delete_short_url(request, pk):
	try:
	    url = ShortenedUrl.objects.get(pk=pk)
	    url.delete();
	except ShortenedUrl.DoesNotExist:
	    url = None

	return Response({})