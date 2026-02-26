from rest_framework import serializers
from .models import Issue

class IssueSerializer(serializers.ModelSerializer):
    reporter_name = serializers.ReadOnlyField(source='reporter.username')

    class Meta:
        model = Issue
        fields = [
            'id', 'title', 'description', 'latitude', 'longitude', 
            'address', 'image', 'status', 'priority', 
            'reporter', 'reporter_name', 'created_at'
        ]
        read_only_fields = ['reporter',  'priority', 'ai_classification']
        # Note: Status aur Priority user set nahi karega, wo admin/AI karega