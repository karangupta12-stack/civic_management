from django.contrib import admin
from .models import City

# Register your models here.

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'subdomain', 'is_active', 'created_at')
    search_fields = ('name', 'subdomain')