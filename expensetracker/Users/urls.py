from django.urls import path
from .views import testing, RegisterAPI, UpdateAPI, LoginAPI, LogoutAPI, ApproveRequest
from .readonyviews import get_users, get_users_by_company, get_companies

urlpatterns = [
    path('', testing),
    path('register/', RegisterAPI.as_view()),
    path('register/<uuid:pk>', UpdateAPI.as_view()),
    path('approverequest/', ApproveRequest.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', LogoutAPI.as_view()),

    path('list/', get_users),
    path('list/<str:role>/<int:company>', get_users_by_company),
    path('companies/<uuid:pk>/<str:role>', get_companies),



]
