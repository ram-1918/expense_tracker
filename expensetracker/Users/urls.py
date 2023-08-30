from django.urls import path
from .views import testing, RegisterAPI, UpdateAPI, LoginAPI, LogoutAPI, ApproveRequest

urlpatterns = [
    path('', testing),
    path('register/', RegisterAPI.as_view()),
    path('register/<int:pk>', UpdateAPI.as_view()),
    path('approverequest/', ApproveRequest.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', LogoutAPI.as_view()),

]
