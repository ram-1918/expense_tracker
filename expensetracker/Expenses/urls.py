from django.urls import path
from .views import testing, post_expense_transaction, get_expenses, get_approved_expenses, get_pending_expenses, update_expense, delete_expense
# from .views import get_expenses_by_user, get_expenses_by_role, get_expenses_by_company, get_expenses_by_date
# from .views import update_status 
# from .views import total_expense_requests, sum_of_approved, sum_of_pending, sum_of_reembersments

urlpatterns = [
    path('', testing),
    # section 1 - own
    path('post/', post_expense_transaction),
    path('list/', get_expenses),
    path('list_approved/', get_approved_expenses),
    path('list_pending/', get_pending_expenses),
    path('update/<uuid:pk>', update_expense),
    path('delete/', delete_expense),

    # section 2
    # path('list_by_role/', get_expenses_by_role), # role specific expenses
    # path('list_by_user/<uuid:userid>', get_expenses_by_user), 
    # path('list_by_company/<id:company>', get_expenses_by_company),
    # path('list_by_date/<str:date>', get_expenses_by_date),

    # # section 3
    # path('update_status/<uuid:pk>', update_status),

    # # section 4 - aggregations
    # path('total_expense_requests/', total_expense_requests),
    # path('sum_of_approved/', sum_of_approved),
    # path('sum_of_pending/', sum_of_pending),
    # path('sum_of_reembersements', sum_of_reembersments)
]
