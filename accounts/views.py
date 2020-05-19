from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from captcha.fields import ReCaptchaField

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
    return render(request, "accounts/auth.html", context)


def register_view(request):
    form = UserCreationForm(request.POST or None)
    captcha = ReCaptchaField()
    if form.is_valid():
        form.save()
        # user.set_password(user.cleaned_data.get('password1'))
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('/')
    context = {
        "form": form,
        "btn-label": "Register",
        "title": "Register",
        "captcha": True
    }
    return render(request, "accounts/auth.html", context)
