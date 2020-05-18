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
from tweets.serializier import TweetSerializer
from tweets.models import Tweet
from ..serializers import PublicProfilesSerializer

# Create your views here.

User = get_user_model()


@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username):
    qs = Profiles.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found."}, status=404)
    profile_obj = qs.first()
    data = PublicProfilesSerializer(
        instance=profile_obj, context={"request": request})
    print(data)
    return Response(data.data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers = me.profiles.followers.all()
        return Response({"followers": my_followers.count()}, status=200)
    if not other_user_qs.exists():
        return Response({}, status=400)
    other = other_user_qs.first()
    profiles = other.profiles
    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        profiles.followers.add(me)
    elif action == "unfollow":
        profiles.followers.remove(me)
    else:
        pass

    current_followers_qs = profiles.followers.all().count()
    return Response({"followers": current_followers_qs}, status=200)
