from django import forms
from .models import Profiles
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileForm(forms.ModelForm):

    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email_address = forms.CharField(required=False)

    class Meta:
        model = Profiles
        fields = ['location', 'bio']
