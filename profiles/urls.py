from django.urls import path, include
from .views import profile_detail_view, profile_update_view, profile_list_all

urlpatterns = [
    path('edit', profile_update_view),
    path('all', profile_list_all),
    path('<str:username>', profile_detail_view),

]
