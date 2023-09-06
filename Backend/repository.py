import pymongo
from dotenv import load_dotenv
import os 
from bson import json_util
from fastapi.responses import JSONResponse
import json
load_dotenv()
MONGO_URL = os.environ.get('MONGO_URL')
MONGO_DB_NAME = os.environ.get('MONGO_DB_NAME')
MONGO_COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME')
# Connect to your MongoDB server
client = pymongo.MongoClient(MONGO_URL)
db = client[MONGO_DB_NAME] 
collection = db[MONGO_COLLECTION_NAME] 

def get_project_names():

    # Retrieve unique values from the "project_name" column
    unique_project_names = collection.distinct("project_name")
    # Print the unique project names
    return unique_project_names


def get_data_by_projectName(project_name:str):
    query = {"project_name": project_name}
    result =  list(collection.find(query))
    return json.loads(json_util.dumps(result))
