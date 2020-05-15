from django.shortcuts import render, redirect
from django.http import Http404
# from django.contrib.auth.
from .models import Profiles
from .forms import ProfileForm


# Create your views here.


def profile_detail_view(request, username):
    qs = Profiles.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        "username": username,
        "profile": profile_obj
    }
    return render(request, "profiles/detail.html", context)


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=/profiles/update")
    my_profile = request.user.profiles
    user = request.user
    form = ProfileForm(request.POST or None, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email_address = form.cleaned_data.get("email_address")
        user.first_name = first_name
        user.last_name = last_name
        user.email_address = email_address
        user.save()
        profile_obj.save()
    context = {
        "form": form,
        "title": "Update Profile",
        "btn_label": "Save"
    }
    return render(request, "profiles/update.html", context)
