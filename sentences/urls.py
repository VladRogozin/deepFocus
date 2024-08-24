from django.urls import path
from . import views

app_name = 'sentences'

urlpatterns = [
    path('', views.playlist_list, name='playlist_list'),
    path('add_playlist/', views.add_playlist, name='add_playlist'),
    path('delete_playlist/<int:pk>/', views.delete_playlist, name='delete_playlist'),
    path('add_sentence/', views.add_sentence, name='add_sentence'),
    path('edit_sentence/<int:pk>/', views.edit_sentence, name='edit_sentence'),
    path('delete_sentence/<int:pk>/', views.delete_sentence, name='delete_sentence'),
    path('game/<int:playlist_id>/', views.game, name='game'),
    path('playlist/<int:playlist_id>/edit/', views.edit_playlist, name='edit_playlist'),

]
