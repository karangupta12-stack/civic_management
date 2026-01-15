from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel # Humara base model (UUID + Timestamp)

class Issue(TimeStampedModel):
    # Enums for Dropdowns
    class Status(models.TextChoices):
        OPEN = 'OPEN', 'Open'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        RESOLVED = 'RESOLVED', 'Resolved'
        REJECTED = 'REJECTED', 'Rejected'

    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        CRITICAL = 'CRITICAL', 'Critical'

    # 1. Who reported it?
    reporter = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='reported_issues'
    )
    
    # 2. What is the issue?
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # 3. Where is it? (SQLite friendly approach)
    # Baad me hum isse PostGIS PointField me migrate karenge
    latitude = models.DecimalField(max_digits=9, decimal_places=6) 
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=255, blank=True, null=True)

    # 4. Media (Photo proof)
    image = models.ImageField(upload_to='issues/', blank=True, null=True)

    # 5. Management
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.OPEN
    )
    priority = models.CharField(
        max_length=20, 
        choices=Priority.choices, 
        default=Priority.MEDIUM
    )
    
    # AI Fields (Future Proofing ke liye abhi se add kar rahe hain)
    # Jab hum AI integrate karenge, wo in fields ko auto-fill karega
    ai_classification = models.CharField(max_length=100, blank=True, null=True)
    ai_confidence_score = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.status}"