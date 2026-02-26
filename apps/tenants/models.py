from django.db import models

# Create your models here.
class City(models.Model):
    name = models.CharField(max_length=100, unique=True) # e.g., "Indore"
    subdomain = models.CharField(max_length=50, unique=True) # e.g., "indore" (indore.civicflow.com)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name