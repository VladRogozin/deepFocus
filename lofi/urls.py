from django.urls import path
from . import views

app_name = 'lofi'

urlpatterns = [
    path('', views.mix_list, name='mix_list'),
    path('mix/<int:mix_id>/', views.mix_detail, name='mix_detail'),
]
