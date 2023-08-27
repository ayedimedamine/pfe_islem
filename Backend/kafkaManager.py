from aiokafka import AIOKafkaConsumer
import os 
from fastapi import WebSocket
import json
from dotenv import load_dotenv

load_dotenv()
KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
PREDECTION_RESULTS_TOPIC = os.environ.get('PREDECTION_RESULTS_TOPIC')

async def consume(websocket: WebSocket):
    consumer = AIOKafkaConsumer(
        PREDECTION_RESULTS_TOPIC,
        bootstrap_servers=KAFKA_BROKER_URL,
        value_deserializer=lambda value: json.loads(value))
    
    await consumer.start()
    try:
        # Consume messages
        async for msg in consumer:
            await websocket.send_text(f"{msg.value}")
    finally:
        # Will leave consumer group; perform autocommit if enabled.
        await consumer.stop()
