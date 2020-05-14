from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

# Create your views here.


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {
        "form": form,
        "btn-label": "login",
        "title": "Login"
    }

    return render(request, "accounts/auth.html", context)


def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form": None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click to Confirm",
        "title": "Logout"
    }
    return render(request, "accounts/logout.html", context)


def register_view(request):
    form = UserCreationForm(request, data=request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)
    context = {
        "form": form,
        "btn-label": "Register",
        "title": "Register"
    }
    return render(request, "accounts/auth.html", context)
