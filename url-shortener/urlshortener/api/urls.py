from django.urls import path
from api import views

urlpatterns = [
    path('urls/', views.url_list)
]