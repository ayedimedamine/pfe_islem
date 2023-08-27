from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
from urllib3.response import HTTPResponse
import os
load_dotenv()
access_key = os.environ['ACCESS_KEY']
secret_key = os.environ['SECRET_KEY']
minio_host = os.environ['MINIO_HOST']
bucket_name = os.environ['BUCKET_NAME']
# Create a client with the MinIO server playground, its access key
# and secret key.
client = Minio(
    endpoint=minio_host,
    access_key=access_key,
    secret_key=secret_key,
    secure = False
)

# Make bucket if not exist.
found = client.bucket_exists(bucket_name)
if not found:
    client.make_bucket(bucket_name)
else:
    print("Bucket a" + bucket_name + " already exists")


def save_file(data, object_name):
    try:
        client.put_object(
            bucket_name=bucket_name,
            object_name=object_name,
            data=data,
            length=-1,
            part_size=10*1024*1024,
        )
    except S3Error as exc:
        print("error occurred.", exc)

def read_file(object_name) -> HTTPResponse:
    try:
        data = client.get_object(
            bucket_name=bucket_name,
            object_name=object_name
        )
        return data
    except S3Error as exc:
        print("error occurred.", exc)
def delete_file(object_name):
    try:
        client.remove_object(
            bucket_name=bucket_name,
            object_name=object_name
        )
    except S3Error as exc:
        print("error occurred.", exc)