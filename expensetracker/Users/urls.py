from django.urls import path
from .views import testing, getUsersView, PostUsersView, GetAndUpdateUserView, deleteuserbyadmin, LoginAPI, logout
from .views import get_registration_requests, change_registration_status, list_companies, get_users_by_company, summaries_for_dashboard, all_companies
# from .views import total_registration_requests

urlpatterns = [
    path('', testing),

    # section 1
    path('listusers/', getUsersView, name="listusers"),
    path('register/', PostUsersView.as_view()),
    path('user/<uuid:pk>', GetAndUpdateUserView.as_view()),

    # section 2
    path('deleteuserbyadmin/', deleteuserbyadmin),
    path('login/', LoginAPI.as_view()),
    path('logout/', logout),
    
    # section 3
    path('companies/', list_companies),
    path('list/<int:company>', get_users_by_company),
    path('registrationrequests/', get_registration_requests),
    path('changeregistrationstatus/', change_registration_status),

    # section 4
    path('user_summaries_for_dashboard/', summaries_for_dashboard),

    # section 5
    path('allcompanies/', all_companies)

]
