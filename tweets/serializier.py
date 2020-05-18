from rest_framework import serializers
from .models import Tweet
from django.conf import settings
from profiles.serializers import PublicProfilesSerializer


MAX_LENGTH = 240
TWEET_ACTION_OPTIONS = ["like", "unlike", "retweet"]


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError(
                "This is not a valid action for tweets")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):

    user = PublicProfilesSerializer(source='user.profiles', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError(
                "Tweets cannot be more than 240 characters.")
        return value

    # def get_user(self, obj):
    #     return obj.user.id


class TweetSerializer(serializers.ModelSerializer):
    user = PublicProfilesSerializer(source='user.profiles', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    og_tweet = TweetCreateSerializer(source='parent', read_only=True)

    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes',
                  'is_retweet', 'og_tweet', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    # def get_user(self, obj):
    #     return obj.user.id
