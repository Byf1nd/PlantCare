from django.urls import path
from .views import (
    PlantListView,
    PlantCreateView,
    PlantDetailView,
    PlantUpdateView,
    PlantDeleteView
)

app_name = 'plants'

urlpatterns = [
    path('', PlantListView.as_view(), name='plant_list'),
    path('create/', PlantCreateView.as_view(), name='plant_create'),
    path('<int:pk>/', PlantDetailView.as_view(), name='plant_detail'),
    path('<int:pk>/update/', PlantUpdateView.as_view(), name='plant_update'),
    path('<int:pk>/delete/', PlantDeleteView.as_view(), name='plant_delete'),
]
