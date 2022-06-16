from django.urls import path
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('urls/', views.url_list),
    path('shorten/', views.create_short_url),
    path('<str:short_url>', views.redirect_url)
]

urlpatterns = format_suffix_patterns(urlpatterns)