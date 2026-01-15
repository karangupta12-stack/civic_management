from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'City Admin'
        OFFICER = 'OFFICER', 'Department Officer'
        FIELD_WORKER = 'FIELD_WORKER', 'Field Worker'
        CITIZEN = 'CITIZEN', 'Citizen'

    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.CITIZEN)
    
    # Multi-tenancy ke liye (Optional start me, par baad me kaam aayega)
    # tenant = models.ForeignKey('tenants.Tenant', on_delete=models.SET_NULL, null=True)

    USERNAME_FIELD = 'email'  # Login with Email
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.email} ({self.role})"
    
