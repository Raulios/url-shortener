from django.db import models

class ShortenedUrl(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	original_url = models.URLField()
	short_url = models.CharField(max_length=30, unique=True, blank=True)

	class Meta:
	    ordering = ["-created"]

class ShortenedUrlStatPerDay(models.Model):
    date = models.DateTimeField(max_length=100)
    number_of_clicks = models.IntegerField()
    shortened_url = models.ForeignKey(ShortenedUrl, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-date']