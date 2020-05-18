from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse, JsonResponse
from django.conf import settings


# Create your views here.


def home_view(request, *args, **kwargs):
    return render(request, "pages/feed.html")


def tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    print("Tweet ID is -", tweet_id)
    return render(request, "tweets/detail.html", context={'tweet_id': tweet_id})
