from fastapi import FastAPI, WebSocket
import kafkaManager
from fastapi.middleware.cors import CORSMiddleware
from repository import get_project_names, get_data_by_projectName
app = FastAPI()

"""
Routes
"""
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
async def index():
    return {"message": "welcome to the fraud detection project"}
@app.get('/project_names')
async def getProjectNames():
    return get_project_names()

@app.get('/project/{project_name}')
async def getProjectByProjectNames(project_name:str):
    return get_data_by_projectName(project_name)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        await kafkaManager.consume(websocket)

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=80)
