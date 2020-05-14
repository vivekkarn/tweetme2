from django.contrib import admin
from .models import Tweet, TweetLikes


class TweetLikesAdmin(admin.TabularInline):
    model = TweetLikes


class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikesAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['user__username', 'user__email']

    class Meta:
        model = Tweet


# Register your models here.
admin.site.register(Tweet, TweetAdmin)
admin.site.register(TweetLikes)
