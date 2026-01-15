from django.shortcuts import render
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from apps.issues.models import Issue

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 1. Total Counts (Optimized Query)
        total_issues = Issue.objects.count()
        # 2. Status Breakdown
        status_counts = Issue.objects.values('status').annotate(Count=Count('id'))
        # 3. Priority Breakdown
        priority_counts = Issue.objects.values('priority').annotate(Count=Count('id'))
        # 4. Ward/Location Hotspots (Scalability Logic: Top 5 problem areas)
        
        return Response({
            "total_issues": total_issues,
            "status_counts": status_counts,
            "priority_counts": priority_counts,
            # "ward_hotspots": ward_hotspots,
            "massage": "Dashboard statistics fetched successfully."
        })
        