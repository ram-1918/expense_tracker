from django.urls import path
from .views import testing, RegisterAPI, UpdateAPI, LoginAPI

urlpatterns = [
    path('', testing),
    path('register/', RegisterAPI.as_view()),
    path('register/<int:pk>', UpdateAPI.as_view()),
    path('login/', LoginAPI.as_view()),

]
