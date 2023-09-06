import socketio
from fastapi import FastAPI
import asyncio
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
sio_server = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
sio_server.always_connect = True
sio = socketio.ASGIApp(sio_server, socketio_path='socket.io')
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
app.mount("/", sio)
@app.get('/index')
def welcome():
     return "hello from main"
@sio_server.event
def connect(sid, environ):
    print("connect ", sid)

@sio_server.event
async def message(sid, data):
    for i in range(10):
         await sio_server.send(i)

@sio_server.event
def disconnect(sid):
    print('disconnect ', sid)

@sio_server.event
def connect_error(data):
    print("The connection failed!")

@sio_server.event
async def payload(sid, data):
    await sio_server.emit('payload', sid)
def main():
     uvicorn.run(app="socketfile:app",host="0.0.0.0", port=80, reload=True)
if __name__ == "__main__":
        asyncio.run(main())