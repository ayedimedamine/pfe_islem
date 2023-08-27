from fastapi import FastAPI, WebSocket
import kafkaManager
app = FastAPI()

"""
Routes
"""

@app.get('/')
async def index():
    return {"message": "welcome to the fraud detection project"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        await kafkaManager.consume(websocket)

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=80)
