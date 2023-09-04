from django.urls import path
from .views import testing, RegisterAPI, UserAPI, LoginAPI, ApproveRequest, GenericUserView, view_users, logout
from .readonyviews import get_users, get_users_by_company, get_companies

urlpatterns = [
    path('', testing),


    path('register/', RegisterAPI.as_view()),
    path('user/<uuid:pk>', UserAPI.as_view()),
    path('approverequest/', ApproveRequest.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', logout),

    path('list/', GenericUserView.as_view()),
    path('userinfo/', view_users),
    path('list/<str:role>/<int:company>', get_users_by_company),
    path('companies/<uuid:pk>/<str:role>', get_companies),



]
