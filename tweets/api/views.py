from django.db.models import Q
from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse, JsonResponse
from django.conf import settings
from ..models import Tweet
from ..forms import TweetForm
import random
from django.utils.http import is_safe_url
from ..serializier import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination

# Create your views here.


@api_view(['POST'])  # http method of client = POST
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):

    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        print("Requesting user is", request.user)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)

    return Response({}, status=400)


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username')
    print('username is ', username)
    if username != None:
        qs = qs.by_username(username)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs[0]
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required.
    Action options are like, unlike and retweet.
    '''
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')

        qs = Tweet.objects.filter(id=tweet_id)

        if not qs.exists():
            return Response({'message': 'Tweet cannot be liked.'}, status=404)

        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                user=request.user,
                parent=obj,
                content=content
            )
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)

    return Response({'message': 'Tweet liked'}, status=201)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message': 'Tweet cannot be removed.'}, status=404)
    obj = qs.first()
    obj.delete()
    return Response({'message': 'Tweet removed.'}, status=201)


def tweet_create_view_pure_django(request, *args, **kwargs):
    if not request.user.is_authenticated:
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next")
    if form.is_valid():
        # Create, but don't save the new form instance.
        obj = form.save(commit=False)

        # Do other related logic
        obj.user = request.user or None

        # Save the new instance.
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)

        if next_url != None:
            return redirect(next_url)

        form = TweetForm()

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, 'components/forms.html', context={'form': form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    """

    data = {
        "id": tweet_id
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not found"
        status = 400
    return JsonResponse(data, status=status)
