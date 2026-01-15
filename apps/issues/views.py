from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Issue
from .serializers import IssueSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated] # Sirf logged-in user hi issue daal sakta hai

    def perform_create(self, serializer):
        # Issue create karte waqt logged-in user ko automatically 'reporter' set karo
        serializer.save(reporter=self.request.user)
    
    @action(detail=True, methods=['post'], url_path='update-ai-result')
    def update_ai_result(self, request, pk=None):
        issue = self.get_object()
        
        # AI ye data bhejega: { "category": "Pothole", "confidence": 0.95, "priority": "HIGH" }
        ai_data = request.data
        
        issue.ai_classification = ai_data.get('category')
        issue.ai_confidence_score = ai_data.get('confidence')
        
        # Agar confidence high hai, to priority auto-set kar do
        if ai_data.get('priority'):
            issue.priority = ai_data.get('priority')
            
        issue.save()
        
        return Response({"status": "AI Analysis Updated Successfully"})