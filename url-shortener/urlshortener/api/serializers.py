from rest_framework import serializers
from api.models import ShortedUrl

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortedUrl
        fields = ['id', 'created', 'original_url', 'short_url']