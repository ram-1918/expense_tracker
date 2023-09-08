from django.db import models
from Users.models import Users
from datetime import datetime

# Create your models here.

class Expenses(models.Model):
    userid = models.ForeignKey(Users, related_name='users', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255, default='expense_name')
    amount = models.CharField(max_length=255, blank=False, null=True)
    date_submitted = models.DateTimeField(auto_now=True)
    last_modified = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3')], max_length=3, default=3)
    # status = models.BooleanField(default=False)
    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    day = models.IntegerField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.last_modified:
            self.year = self.last_modified.year
            self.month = self.last_modified.month
            self.day = self.last_modified.day
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Expenses'
        db_table = 'expenses'
    
    def __str__(self):
        return self.name
    
class TypeTags(models.Model):
    expense = models.ForeignKey(Expenses, related_name='tag_expense', on_delete=models.CASCADE)
    name = models.CharField(max_length=25, default='regular')

    class Meta:
        verbose_name_plural = 'TypeTags'
        db_table = 'type_tags'
    
    def __str__(self):
        return self.name


def upload_to(instance, filename):
    today = datetime.now()
    print(f'Uploading to: uploads/{today.year}/{today.month}/{today.day}/{filename}')
    return f'uploads/{today.year}/{today.month}/{today.day}/{filename}'

# Expenses - Parent; Proofs - Child; analogy: so each child will be pointing to only one parent 
class ExpenseProofs(models.Model):
    expense = models.ForeignKey(Expenses, related_name='proof_expense', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
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
        return self.name # self.expense_proof.users.fullname

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