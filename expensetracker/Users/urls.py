from django.urls import path
from .views import testing, RegisterAPI, UserAPI, get_single_user, update_user_by_admin, deleteuserbyadmin, change_registration_request_status, LoginAPI, logout
from .readonyviews import list_users, get_users_by_company, get_companies, get_registration_requests

urlpatterns = [
    path('', testing),

    path('register/', RegisterAPI.as_view()),
    path('approverequest/<uuid:pk>', RegisterAPI.as_view()),

    path('user/<uuid:pk>', UserAPI.as_view()),
    path('getsingleuser/', get_single_user),
    path('updateuser/', update_user_by_admin),
    path('deleteuserbyadmin/', deleteuserbyadmin),
    path('changeregistrationstatus/', change_registration_request_status),
    path('login/', LoginAPI.as_view()),
    path('logout/', logout),
    
    # Read only
    path('listusers/', list_users),
    path('companies/', get_companies),
    path('list/<int:company>', get_users_by_company),
    path('registrationrequests/', get_registration_requests),
]
