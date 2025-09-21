from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.urls import reverse_lazy
from .models import Plant
from .forms import PlantForm  # <--- importar el formulario

# Lista de plantas
class PlantListView(ListView):
    model = Plant
    template_name = 'plants/plant_list.html'

# Detalle de una planta
class PlantDetailView(DetailView):
    model = Plant
    template_name = 'plants/plant_detail.html'

# Crear nueva planta
class PlantCreateView(CreateView):
    model = Plant
    form_class = PlantForm  # <--- usamos el form personalizado
    template_name = 'plants/plant_form.html'
    success_url = reverse_lazy('plants:plant_list')

# Editar planta existente
class PlantUpdateView(UpdateView):
    model = Plant
    form_class = PlantForm  # <--- usamos el form personalizado
    template_name = 'plants/plant_form.html'
    success_url = reverse_lazy('plants:plant_list')

# Eliminar planta
class PlantDeleteView(DeleteView):
    model = Plant
    template_name = 'plants/plant_confirm_delete.html'
    success_url = reverse_lazy('plants:plant_list')
