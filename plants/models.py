from django.db import models

class Plant(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    watering_interval = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='plants/', null=True, blank=True)
    description = models.TextField(blank=True, null=True)  # <--- Agregado

    def __str__(self):
        return self.name