from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse, JsonResponse
from django.conf import settings
from django.contrib.auth import get_user_model
import random
from django.utils.http import is_safe_url
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from ..models import Profiles

# Create your views here.

User = get_user_model()


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if not other_user_qs.exists():
        return Response({}, status=400)
    other = other_user_qs.first()
    profiles = other.profiles
    data = {}
    try:
        data = request.data
    except:
        pass
    action = data.get("action")
    if action == "follow":
        profiles.followers.add(me)
    elif action == "unfollow":
        profiles.followers.remove(me)
    else:
        pass

    current_followers_qs = profiles.followers.all().count()
    return Response({"followers": current_followers_qs}, status=200)
