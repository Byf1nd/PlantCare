from django import forms
from .models import Plant

class PlantForm(forms.ModelForm):
    class Meta:
        model = Plant
        fields = ['name', 'species', 'description', 'watering_interval', 'price', 'image']
        labels = {
            'name': 'Nombre de la planta',
            'species': 'Especie',
            'description': 'Descripción',
            'watering_interval': 'Intervalo de riego (días)',
            'price': 'Precio',
            'image': 'Imagen',
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej: Monstera deliciosa'}),
            'species': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej: Araceae'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Ej: Planta tropical con hojas grandes...', 'rows': 4}),
            'watering_interval': forms.NumberInput(attrs={'class': 'form-control', 'min': 1}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }