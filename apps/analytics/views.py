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
        # 1. Total Counts — UPPERCASE use karo (database mein aise hi hai)
        total_issues = Issue.objects.count()
        resolved_issues = Issue.objects.filter(status='RESOLVED').count()
        pending_issues = Issue.objects.filter(status='OPEN').count()
        in_progress_issues = Issue.objects.filter(status='IN_PROGRESS').count()
        rejected_issues = Issue.objects.filter(status='REJECTED').count()

        # 2. Status Breakdown
        # FIX: count=Count('id') — 'count' lowercase ZAROORI hai
        # Capital 'Count' hone par frontend item.count nahi dhundh pa raha tha
        status_breakdown = Issue.objects.values('status').annotate(count=Count('id'))

        # 3. Priority Breakdown — same fix, lowercase 'count'
        priority_counts = Issue.objects.values('priority').annotate(count=Count('id'))

        return Response({
            "total_issues": total_issues,
            "resolved_issues": resolved_issues,
            "pending_issues": pending_issues,
            "in_progress_issues": in_progress_issues,
            "rejected_issues": rejected_issues,
            "status_breakdown": status_breakdown,   # Key name frontend se match
            "priority_counts": priority_counts,
            "massage": "Dashboard statistics fetched successfully."
        })