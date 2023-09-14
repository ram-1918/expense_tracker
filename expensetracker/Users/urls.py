from django.urls import path
from .views import testing, RegisterAPI, UserAPI, LoginAPI, logout
from .readonyviews import list_users, get_users_by_company, get_companies

urlpatterns = [
    path('', testing),

    path('register/', RegisterAPI.as_view()),
    path('approverequest/<uuid:pk>', RegisterAPI.as_view()),

    path('user/<uuid:pk>', UserAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', logout),
    
    # Read only
    path('listusers/', list_users),
    path('companies/', get_companies),
    path('list/<int:company>', get_users_by_company),
]
