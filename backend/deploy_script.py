'''
must be one of: ACL, Bucket, CreateBucketConfiguration, GrantFullControl, 
GrantRead, GrantReadACP, GrantWrite, GrantWriteACP, ObjectLockEnabledForBucket, ObjectOwnership
'''

import boto3
from decouple import config
import json

class AWSClient():
    def __init__(self, access_key, secret_access):
        self.buckets = []
        self.access_id = access_key
        self.access_secret = secret_access
    
    def s3_client_connect(self):
        return boto3.client('s3', aws_access_key_id=self.access_id, aws_secret_access_key=self.access_secret)
    
    def listbuckets(self, client):
        return client.list_buckets()
    
    def createbucket(self, client, bucket, ACL='private', region_name='us-east-2'):
        try:
            client.create_bucket(ACL=ACL, Bucket=bucket, CreateBucketConfiguration={'LocationConstraint':region_name}, ObjectLockEnabledForBucket=False)
            print('Bucket created')
            return bucket
        except:
            raise GeneratorExit("error occured")

    def getobjects(self, client, bucket_name):
        return client.get_objects(Bucket=bucket_name)


accesskey = config('ACCESS_KEY')
accesssecret = config('ACCESS_SECRET')

awsobj = AWSClient(accesskey, accesssecret)

client = awsobj.s3_client_connect()
buckets = awsobj.listbuckets(client)

if any(['xpensetracker-usa' == obj['Name'] for obj in buckets['Buckets']]): # 'xpensetracker-usa' in buckets['Buckets']:
    print(buckets['Buckets'])
else:
    print(buckets['Buckets'], 'Else')
    awsobj.createbucket(client, 'xpensetracker-usa')
    buckets = awsobj.listbuckets(client)
    print(buckets['Buckets'])

'''
pip3 install awscli
aws configure # use accesskey and secretkeys
aws s3 sync source/ s3://bucketname
'''





# s3 = boto3.client('s3', aws_access_key_id=accesskey, aws_secret_access_key=access_secret)
# buckets = s3.list_buckets()
# # print(json.dumps(buckets, indent=4))

# s3.create_bucket(
#     ACL='private',
#     Bucket='xpensetracker-us',
#     CreateBucketConfiguration={
#         'LocationConstraint': 'us-east-2'
#     },
#     ObjectLockEnabledForBucket=True  # Enable Object Lock if needed
# )

# objects = s3.get_objects(Bucket='xpense_frontend')
# print(objects)
