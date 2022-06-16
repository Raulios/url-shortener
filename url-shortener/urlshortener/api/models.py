from django.db import models

# Create your models here.
class ShortedUrl(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	original_url = models.URLField()
	short_url = models.CharField(max_length=15, unique=True, blank=True)

	class Meta:
	    ordering = ["-created"]