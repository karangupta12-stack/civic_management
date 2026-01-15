from django.db import models

# Create your models here.
import uuid

class TimeStampedModel(models.Model):
    """
    Ek abstract base class jo har model me UUID, created_at aur updated_at add karegi.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True