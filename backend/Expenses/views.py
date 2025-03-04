from .models import Category, Expenses, TypeTags, ExpenseProofs
from .serializers import TypeTagSerializer, GetExpenseSerializer, PostExpenseSerializer, GetExpenseProofSerializer, GetTypeTagSerializer, ExpenseProofSerializer
from Users.serializers import GetUserSerializer
from Users.models import Users, AuthorizedUsers
from Users.authentication import login_required, admin_required, GlobalAccess, decode_uuid

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView, api_view
import json
import time
from rest_framework.exceptions import ValidationError

# Create your views here.


def decodeddata():
    obj = GlobalAccess()
    return (decode_uuid(obj.data['sub']), obj.data['role'])


def testing(request):
    return Response('Expenses app')


def format(image):
    # format stuff
    return image


def processFormData(data):
    newData = {}
    for k, v in dict(data).items():
        if 'image' not in k:
            newData[k] = v[0]
    return newData


def handleExpense(data, userid):
    data['userid'] = userid
    serializer = GetExpenseSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data


def handleImages(images, expenseid):
    for k, v in images.items():
        data = {
            "expense": expenseid,
            "name": k,
            "image": v
        }
        ser = ExpenseProofSerializer(data=data)
        ser.is_valid(raise_exception=True)
        ser.save()


def handleTags(tags, expenseObj):
    tags = list(map(lambda x: x.strip(), tags))
    print(tags)
    records = [TypeTags(expense=expenseObj, name=tag) for tag in tags]
    print(records)
    TypeTags.objects.bulk_create(records)

#           |--------------------------------------------------- APIs  ------------------------------------------------------|


# payment_recepient, amount, tags, category, paymanet_method, description, *images = newdict.values()
'''
{"payment_recepient": "Walmart","amount": 32.234, "category": "regular", "payment_method": "credit", "description": "few groceries", "currency": "usd"}
'''
import base64
from PIL import Image
from io import BytesIO
import numpy as np
import secrets
import os
import pytesseract
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile

'''
PIL
img.resize((width, height))
img.transpose(Image.ROTATE_90)
img.save(path, 'PNG', quality=90)

# Save the resized image to a BytesIO object
image_io = BytesIO()
pil_image.save(image_io, format='PNG')

# Save the BytesIO object as the image file
image_file = ContentFile(image_io.getvalue())
imagefile = default_storage.save(imagename, image_file)
imagefileurl = default_storage.url(imagefile)

for text extraction from an image
brew install tesseract
which tesseract

extracted_text = pytesseract.image_to_string(pil_image, lang='eng', config='--psm 6 --oem 3') # for image to string
pdf = pytesseract.image_to_pdf_or_hocr("pil_image", extension='pdf') # image to pdf
xml = pytesseract.image_to_alto_xml(pil_image)
'''

def image_to_text(pil_image):
    # pytesseract.tesseract_cmd = '/Users/vindesil/Documents/tracker/tracker/venv/bin/pytesseract'
    pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'
    # Binarization
    # pil_image = pil_image.convert('L')  # Convert to grayscale
    # threshold = 150  # Adjust the threshold as needed
    # pil_image = pil_image.point(lambda p: p > threshold and 255)

    # Use pytesseract to do OCR with custom configurations
    # extracted_text = pytesseract.image_to_string(pil_image, lang='eng', config='--psm 6 --oem 3')
    pdf = pytesseract.image_to_pdf_or_hocr(pil_image, extension='pdf')

    with open('test.pdf', 'w+b') as f:
        f.write(pdf) # pdf type is bytes by default

    return ''



def format_image(image, recepient):
    try:
        print(image)
        imagename = recepient+secrets.token_hex(5)+'.png'
        image.name = imagename
        print('1. ', image)
        pil_image = Image.open(image)
        print('2. ', pil_image)
        # data = image_to_text(pil_image) # for extracting text, which is not needed now
        width, height = pil_image.size
        print('3. ', pil_image)
        newsize = (800, 600) if width > height else (600, 800)
        pil_image = pil_image.resize(newsize)
        print(pil_image.size)
        imageio = BytesIO()
        pil_image.save(imageio, format='PNG')
        image_content = imageio.getvalue()
        print('OK')
        image_file = InMemoryUploadedFile(
            ContentFile(image_content),
            None,
            imagename,
            'image/png',  # Adjust the MIME type accordingly # MIME is a standard for formatting files of different types so that they can be sent over internet
            len(image_content),
            None
        )
        print("OKKK")
        return image_file
    except Exception as e:
        print(e)
        return None


def post_proofs(images, expid, recepient):
    try:
        # imagedata = [{"expense": decode_uuid(expid), "filename": '', "image": format_image(image, expid, recepient)} for _, image in images.items()]
        imagedata = []
        for _, image in images.items():
            if formatedimage := format_image(image, recepient):
                imagedata.append({
                    "expense": decode_uuid(expid),
                    "filename": formatedimage.name,
                    "image": formatedimage
                })
        image_ser = ExpenseProofSerializer(data=imagedata, many=True)
        image_ser.is_valid(raise_exception=True)
        return image_ser  # int(image_ser.data['id'])
    except ValidationError as e:
        print(e)
        return False


def post_tags(tags, expenseid):
    tagdata = [{"expense": expenseid, "name": tag.strip().lower()} for tag in tags.split(',')]
    tags_ser = TypeTagSerializer(data=tagdata, many=True)
    try:
        tags_ser.is_valid(raise_exception=True)
        return tags_ser
    except ValidationError as e:
        print(e)
        return False


@api_view(['POST'])
@login_required
def post_expense_transaction(request):
    if images := request.FILES:
        if len(images) > 7:
            return {"msg": "image file count error"}

    data = {key: value[0] for key, value in dict(
        request.data).items() if 'image' not in key}

    # retrieving Category Id
    if not (category := Category.objects.filter(name=data['category']).first()):
        return {"error": "Invalid Category"}, 400

    data = {**data, 'category': category.id, 'userid': decode_uuid(
        data['userid']), 'amount': round(float(data['amount']), 2)}

    serializer = PostExpenseSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except ValidationError as e:
        print(e)
        return {"msg": str(e)}, 400

    expense_id = serializer.data['id']
    expense_name = serializer.data['payment_recepient']
    try:
        if tag_ser := post_tags(data['tags'].strip(','), expense_id):
            if tag_ser:
                if images:
                    proof_ser = post_proofs(images, expense_id, expense_name)
                    proof_ser.save()
                tag_ser.save()
            time.sleep(2)
            return serializer.data, 201
        Expenses.objects.get(id=expense_id).delete()
    except Exception as e:
        return {"msg": "failed to images or tags" + str(e)}, 400

def process_tags(tags):
    from collections import defaultdict
    tag_names = defaultdict(list)
    for tag in tags:
        tag = dict(tag)
        tag_names['names'].append(tag['name'])
    return tag_names

# Get My Expenses
@api_view(['GET'])
@login_required
def get_expenses(request):
    userid, role, *others = decodeddata()
    expenses = Expenses.objects.filter(userid = userid)
    serializer = GetExpenseSerializer(expenses, many=True)
    result = []
    for expense in serializer.data:
        tags = process_tags(expense['expense_tag'])
        cat_instance = Category.objects.filter(id=expense['category']).first()
        username = Users.objects.filter(id=expense['userid']).first()
        result.append({**expense, 'expense_tag': tags, 'category': cat_instance.name, 'username': username.fullname, 'company': username.company.name})
    time.sleep(1)
    return result, 200

# Get All Expenses
@api_view(['GET'])
@login_required
@admin_required
def get_all_expenses(request):
    userid, role, *others = decodeddata()
    expenses = Expenses.objects.all()
    serializer = GetExpenseSerializer(expenses, many=True)
    result = []
    for expense in serializer.data:
        tags = process_tags(expense['expense_tag'])
        cat_instance = Category.objects.filter(id=expense['category']).first()
        username = Users.objects.filter(id=expense['userid']).first()
        result.append({**expense, 'expense_tag': tags, 'category': cat_instance.name, 'username': username.fullname, 'company': username.company.name})
    time.sleep(1)
    return result, 200

@api_view(['GET'])
@login_required
def get_single_expense(request, pk):
    expense = Expenses.objects.filter(id=pk).first()
    ser = GetExpenseSerializer(expense)
    print(expense, ser.data)
    tags = process_tags(ser.data['expense_tag'])
    cat_instance = Category.objects.filter(id=ser.data['category']).first()
    username = Users.objects.filter(id=ser.data['userid']).first()
    result = {**ser.data, 'expense_tag': tags, 'category': cat_instance.name, 'username': username.fullname}
    return result, 200

@api_view(['PATCH'])
@login_required
def update_expense(request, pk):
    expense = Expenses.objects.filter(id = pk).first()
    if not expense: return {"msg": "Invalid expense"}, 400
    try: 
        category = Category.objects.filter(name = request.data['category']).first()
        request.data['category'] = category.id
        request.data['status'] = 'pending'
        ser = PostExpenseSerializer(expense, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        print(ser.data)
    except Exception as e: return {"msg": "error while updating " + str(e)}, 400
    return ser.data, 201

@api_view(['PATCH'])
@login_required
def update_expense_proof(request, pk):
    submitted_proof = request.FILES['image']
    proof = ExpenseProofs.objects.filter(id = pk).first()
    if not proof: return {"msg": "No proof found with this id"}, 400
    try: 
        expense = ExpenseProofs.objects.prefetch_related('expense').filter(id=pk).first()
        formattedimg = format_image(submitted_proof, expense.expense.payment_recepient)
        ser = GetExpenseProofSerializer(proof, data={'image':formattedimg, 'filename': formattedimg.name}, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        print('IMAGES')
        expense.expense.status = 'pending'
        expense.save()
    except Exception as e: return {"msg": "error while updating " + str(e)}, 400
    return ser.data, 201

@api_view(['POST'])
@login_required
def update_expense_tag(request):
    newTags = request.data['tags'] # {id: tagid, newname: tagname}
    print(newTags)
    expenseid = request.data['expense']
    tags = TypeTags.objects.filter(expense = expenseid).all()
    tags.delete()
    print(tags, TypeTags.objects.filter(expense = expenseid))
    if result := post_tags(newTags, expenseid):
        result.save()
        print(result.data)
        return result.data, 200
    else : 
        return {"msg": "Error occured"}, 400
    # tagobj = TypeTags.objects.filter(id = tag['id']).first()
    # if not tagobj: return {"msg": "Invalid tag detail"}, 400
    # try: 
    #     ser = GetTypeTagSerializer(tagobj, data=tag, partial=True)
    #     ser.is_valid(raise_exception=True)
    #     ser.save()
    #     print(ser.data)
    #     result.append(ser.data)
    # except Exception as e: return {"msg": "error while updating " + str(e)}, 400
    # return "done", 201

@api_view(['DELETE'])
@login_required
def delete_expense(request, pk):
    try:
        Expenses.objects.filter(id=pk).first().delete()
        print("deleted")
        return {"msg": "deleted"}, 200
    except Exception as e:
        return {"msg": "error occured "+str(e)}


def get_approved_expenses(request):
    return request.data, 200

@api_view(['GET'])
@login_required
@admin_required
def get_pending_expenses(request):
    userid, role, *others = decodeddata()
    expenses = Expenses.objects.filter(status='pending').exclude(userid__id=userid)
    serializer = GetExpenseSerializer(expenses, many=True)
    result = []
    for expense in serializer.data:
        tags = process_tags(expense['expense_tag'])
        cat_instance = Category.objects.filter(id=expense['category']).first()
        username = Users.objects.filter(id=expense['userid']).first()
        result.append({**expense, 'expense_tag': tags, 'category': cat_instance.name, 'username': username.fullname, 'company': username.company.name})
    return result, 200

@api_view(['POST'])
@login_required
@admin_required
def change_expense_status(request):
    expense_id = request.data.get('expense_id', None)
    try:
        expense = Expenses.objects.filter(status='pending').filter(id=expense_id).first()
        status = request.data['status']
        if expense.rejection_count > 2: 
            expense.status = 'invalidated'
        else:
            if status == 'accept':
                expense.status = 'approved'
            else: 
                expense.status = 'rejected'
                expense.message = request.data['message']
                expense.rejection_count += 1
        expense.save()
    except Exception as e:
        print(str(e))
    return {"msg": "status changed"}, 200

'''
APPROVED: CANNOT DELETE + CANNOT UPDATE
REJECTED: CANNOT DELETE + CAN UPDATE + Message
PENDING: CAN DELETE + CAN UPDATE
INVALIDATED: CANNOT DELETE + CANNOT UPDATE + Message + SHOULD UPLOAD A NEW ONE
'''





# EXTRACTING TRAILS
# import cv2
# from PIL import Image, ImageEnhance
# def image_to_text(pil_image):
#     image_io = BytesIO()
#     pil_image.save(image_io, format='PNG')
#     imagename = "recepient"+secrets.token_hex(5)+'.png'
#     # Save the BytesIO object as the image file
#     image_file = ContentFile(image_io.getvalue())
#     imagefile = default_storage.save(imagename, image_file)
#     imagefileurl = default_storage.url(imagefile)
#     print(pil_image)
#     # Load the image
#     image = cv2.imread(imagefileurl)
#     print(image)
#     # Convert to grayscale
#     gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     print(gray_image)

#     # Thresholding
#     _, binarized_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY_INV)

#     # Noise reduction (Gaussian blur)
#     blurred_image = cv2.GaussianBlur(binarized_image, (5, 5), 0)

#     # Dilation and erosion
#     kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
#     processed_image = cv2.morphologyEx(blurred_image, cv2.MORPH_CLOSE, kernel)

#     # Deskew the image
#     coords = np.column_stack(np.where(processed_image > 0))
#     angle = cv2.minAreaRect(coords)[-1]
#     if angle < -45:
#         angle = -(90 + angle)
#     else:
#         angle = -angle
#     (h, w) = processed_image.shape[:2]
#     center = (w // 2, h // 2)
#     rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
#     processed_image = cv2.warpAffine(processed_image, rotation_matrix, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

#     # Use pytesseract to do OCR with custom configurations
#     print('being processed:')

#     extracted_text = pytesseract.image_to_string(processed_image, lang='eng', config='--psm 6 --oem 3')

#     # Print the extracted text
#     print('Extracted Text:')
#     print(extracted_text)


# @api_view(['POST'])
# @login_required
# def post_expenses(request):
#     userid, _ = decodeddata()
#     data = processFormData(request.data)
#     tags = data.pop('tags').split(',')
#     try:
#         expenseData = handleExpense(data, userid)
#         Expenseobj = Expenses.objects.filter(id=expenseData['id']).first()
#         handleImages(request.FILES, expenseData['id'])
#         handleTags(tags, Expenseobj)
#         return {"id": Expenseobj.id}
#     except:
#         return {"msg": "errorocured"}

# def getusername(userid):
#     try:
#         name = Users.objects.filter(id=userid).first().fullname
#         return name
#     except:
#         return {"msg": "error occured"}

# def getcategortname(catid):
#     try:
#         name = Category.objects.filter(id=catid).first().name
#         return name
#     except:
#         return {"msg": "error occured"}

# @api_view(['GET'])
# @login_required
# def get_expenses(request):
#     userid, role = decodeddata()
#     company_of_the_requester = Users.objects.filter(id = userid, is_active = True).first().company
#     expenses = []
#     if role == 'superadmin':
#         expenses = Expenses.objects.select_related().all()
#     elif role == 'admin':
#         expenses = Expenses.objects.select_related().filter(userid__role = "employee" ).filter(userid__company = company_of_the_requester.id)
#     data = []
#     for  obj in expenses:
#         username, category = obj.userid.fullname, obj.category.name
#         obj = obj.__dict__
#         obj.pop('_state')
#         obj.pop('userid_id')
#         obj.pop('category_id')
#         data.append({**obj, "username": username, "category": category })
#     return data

# @api_view(['GET'])
# @login_required
# def get_expenses_by_user(request):
#     userid, role = decodeddata()
#     expenses = Expenses.objects.filter(userid = userid)
#     print(expenses)
#     serializer = ExpenseSerializer(expenses, many=True)
#     return serializer.data

# @api_view(['GET'])
# @login_required
# def get_user_for_an_expense(request, expid):
#     userid, role = decodeddata()
#     user = Expenses.objects.filter(id=expid).first()
#     userinfo = GetUserSerializer(user.userid)
#     return userinfo.data

# @api_view(['GET'])
# @login_required
# def get_expenses_by_role(request):
#     userid, role = decodeddata()
#     if role == 'admin':
#         # expenses = Expenses.objects.prefetch_related('userid').filter(company=7)
#         user = Users.objects.filter(id=userid).first()
#         expenses = Expenses.objects.filter(userid__company = user.company, userid__role='employee', status = '3')
#         # print(user.fullname, user.role, user.company, role, expenses)
#         # for obj in expenses:
#         #     print(obj.name, obj.userid, obj.userid.company, obj.userid.role)
#         expenses_under_admin = ExpenseSerializer(expenses, many=True)
#         return expenses_under_admin.data
#     elif role == 'superadmin':
#         expenses = Expenses.objects.all()
#         expenses_under_superadmin = ExpenseSerializer(expenses, many=True)
#         return expenses_under_superadmin
#     return "unauthorized"

# @api_view(['PATCH'])
# @login_required
# def update_status(request, pk):
#     change = request.data['change']
#     expid = request.data['id']
#     expenses = Expenses.objects.filter(id=expid).filter().first()
#     print(pk, request.data, '_-_-_-_---_', change)
#     try:
#         if change == 'accept':
#             print(expenses.status, expenses)
#             expenses.status = '1' # 1 - approved
#             expenses.save()
#             print(expenses)
#         else:
#             expenses.status = '2' # 2 - rejected
#             expenses.save()
#             print(expenses)
#         return 'ok'
#     except:
#         return 'failed'
