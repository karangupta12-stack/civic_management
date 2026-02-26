from django.contrib import admin
from .models import Issue   
# Register your models here.

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('title', 'reporter', 'status', 'priority', 'created_at')
    list_filter = ('status', 'priority', 'created_at')
    search_fields = ('title', 'description', 'reporter__username')
    fieldsets = (
        ('Basic Info', {'fields': ('title', 'description', 'image', 'reporter')}),
        ('Status & Priority', {'fields': ('status', 'priority')}),
        ('Location', {'fields': ('latitude', 'longitude', 'address')}),
        # ('AI Analysis', {'fields': ('ai_classification', 'ai_confidence')}),
    )