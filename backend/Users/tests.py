from django.test import TestCase
import pytest_lazyfixture

from .views import RegisterAPI

# Create your tests here.
# Flags => -s(disables djangos auto reloading feature), -n(runs test in parallel),
# -x(stops assoonas on test fails), -k(to run specifc tests, ex: that starts with word test)

@pytest_lazyfixture
def userInfo():
    return {
        'firstname': "ram", 
        "lastname": "chandra",
        "email": "crc.5453@gmail.com",
        "phone": "7166171918",
        "password": "Qwert123@",
        "company": "Cloud5",
        "employeeid": "de23r"
        }

def test_register(userInfo):
    registerObj = RegisterAPI()
    user = userInfo()
    result = registerObj.post(user)
    assert result == 'Created'
