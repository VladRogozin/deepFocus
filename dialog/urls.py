from django.urls import path
from . import views

app_name = 'dialog'  # Убедитесь, что это указано

urlpatterns = [
    path('', views.chapter_list, name='chapter_list'),
    path('chapter/<int:chapter_id>/', views.chapter_detail, name='chapter_detail'),
    path('modul/', views.modul_list, name='modul_list'),
    path('modul_detail/<int:modul_id>/', views.modul_detail, name='modul_detail'),
    path('api/chapter/<int:chapter_id>/', views.chapter_detail_api, name='chapter_detail_api'),
]