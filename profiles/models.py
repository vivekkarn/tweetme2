from django.db import models
from django.conf import settings
from django.db.models.signals import pre_save, post_save

# Create your models here.
User = settings.AUTH_USER_MODEL


class FollowerRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profiles", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Profiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(
        User, related_name="following", blank=True)


def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        Profiles.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
