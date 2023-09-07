from django.urls import path
from .views import testing, post_expenses, get_expenses, update_status
from .views import get_user_for_an_expense, get_expenses_by_user, get_expenses_by_role

urlpatterns = [
    path('', testing),
    path('list/', get_expenses),
    path('get_user_for_an_expense/<int:expid>', get_user_for_an_expense),
    path('list_by_user/', get_expenses_by_user),
    path('list_by_role/', get_expenses_by_role),
    path('post/', post_expenses),
    path('update_status/<uuid:pk>', update_status),
]
