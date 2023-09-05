from django.urls import path
from .views import testing, get_expenses, post_expenses

urlpatterns = [
    path('', testing),
    path('list/', get_expenses),
    path('post/', post_expenses),
]
