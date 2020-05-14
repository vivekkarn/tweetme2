from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet
from rest_framework.test import APIClient

# Create your tests here.

User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="abc", password="somepassword")
        Tweet.objects.create(
            content="my first tweeet for test", user=self.user)
        Tweet.objects.create(
            content="my second tweeet for test", user=self.user)
        Tweet.objects.create(
            content="my third tweeet for test", user=self.user)

    def test_user_exists(self):
        self.assertEqual(self.user.username, "abc")

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(
            content="my fourth tweeet for test", user=self.user)
        self.assertEqual(tweet_obj.id, 4)
        self.assertEqual(tweet_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="somepassword")
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_tweet_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action",
                               {'id': 1, 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        like_counts = response.json().get("likes")
        self.assertEqual(like_counts, 1)

    def test_tweet_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action",
                               {'id': 1, 'action': 'unlike'})
        self.assertEqual(response.status_code, 200)

    def test_tweet_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action",
                               {'id': 1, 'action': 'retweet'})
        self.assertEqual(response.status_code, 201)
