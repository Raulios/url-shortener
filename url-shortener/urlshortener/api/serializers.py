from rest_framework import serializers
from api.models import ShortenedUrl, ShortenedUrlStatPerDay

class ShortenedUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedUrl
        fields = ['id', 'created', 'original_url', 'short_url']

class ShortenedUrlStatPerDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedUrlStatPerDay
        fields = ['id', 'date', 'number_of_clicks', 'shortened_url']