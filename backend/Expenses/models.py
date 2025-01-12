from django.db import models
from Users.models import Users
from datetime import datetime
import uuid

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Category'
    
    def __str__(self):
        return self.name

# date, category, amount, description, payment method, payment recepient, receipt, expense id/ reference number, currency, tax info

# https://www.geeksforgeeks.org/prefetch_related-and-select_related-functions-in-django/

class Expenses(models.Model):
    choices = [('cash', 'Cash'), ('credit', 'Credit Card'), ('debit', 'Debit Card'), ('cheque', 'Cheque')]
    currency_choices = [('usd', 'USD'), ('inr', 'INR')]
    status_choices = [('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected'), ('invalidated', 'Invalidated')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userid = models.ForeignKey(Users, related_name="user", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name="category", on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(auto_now=True)
    last_modified = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    description = models.TextField(blank = True)
    payment_method = models.CharField(choices=choices, default='card', max_length=15)
    payment_recepient = models.CharField(max_length=100, null=True, blank=True)
    message = models.TextField(blank=True)
    currency = models.CharField(choices=currency_choices, default='usa', max_length=15)
    status = models.CharField(choices=status_choices, default='pending', max_length=30)
    rejection_count = models.IntegerField(default=0)

    @property
    def list_categories(self):
        categories = Category.objects.all()
        choices = list(zip(range(1, len(categories) + 1), categories))
        return choices

    class Meta:
        verbose_name_plural = 'Expenses'
        db_table = 'expenses'
        indexes = [
            models.Index(fields=['id']),
        ]
    
    def __str__(self):
        return f'{self.payment_recepient} - {self.category} - {self.amount}'
    
class TypeTags(models.Model):
    expense = models.ForeignKey(Expenses, related_name='expense_tag', on_delete=models.CASCADE)
    name = models.CharField(max_length=25, default='regular')

    class Meta:
        verbose_name_plural = 'TypeTags'
        db_table = 'type_tags'
    
    def __str__(self):
        return self.name

def upload_to(instance, filenamee):
    today = datetime.now()
    print(f'Uploading to: uploads/{today.year}/{today.month}/{today.day}/{instance.expense.id}/{filenamee}')
    return f'uploads/{today.year}/{today.month}/{today.day}/{instance.expense.id}/{filenamee}'

# Expenses - Parent; Proofs - Child; analogy: so each child will be pointing to only one parent 
class ExpenseProofs(models.Model):
    expense = models.ForeignKey(Expenses, related_name='expense_proof', on_delete=models.CASCADE)
    filename = models.CharField(max_length=255, blank=True, null=True)
    date_uploaded = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Proofs'

        # order_with_respect_to = 'expense' 
        '''
        orders images based on an expense - https://docs.djangoproject.com/en/4.2/ref/models/options/
        1. get_RELATED_order() - retrieves the order, of the child objects - used on parent object
        2. set_RELATED_order() - sets the order of the child objects  - used on parent object
        3. get_next_in_order() - retrieves the object that is next to the child object - applied on child object
        4. get_previous_in_order() - retrieves the object that is previous to the child object - applied on child object
        '''
    def __str__(self):
        return str(self.image) # self.expense_proof.users.fullname

'''
https://buildatscale.tech/select_related-vs-prefetch_related/

One PARENT(Expenses) can have Multiple CHILDREN(Proofs)
1. Select_related - proofs.objects.select_related('expense').all() - 'expense' used in the field name in proofs model
2. Prefetch_related - proofs.objects.select_related('expense').all() - 'expense' used in the field name in proofs model

3. select_related advanced - expenses.objects.select_related('expenses').all() - 'expenses' used is related name set on the foriegn key field
4. prefetch_related advanced - expenses.objects.prefetch_related('expenses').all() - 'expenses' used is related name set on the foriegn key field

quizzes = Quiz.objects.prefetch_related(
        Prefetch('questions', queryset=Question.objects.filter(question_type=Question.OBJECTIVE))
    )
'''