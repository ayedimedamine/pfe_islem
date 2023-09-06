import json
import os
from kafka import KafkaConsumer, KafkaProducer
from fraud_detection.predection import manage_predection, prepare_data, predict, loadModel
import logging

KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
CODE_SOURCES_METRICS_TOPIC = os.environ.get('CODE_SOURCES_METRICS_TOPIC')
PREDECTION_RESULTS_TOPIC = os.environ.get('PREDECTION_RESULTS_TOPIC')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

model = loadModel()

if __name__ == '__main__':

    consumer = KafkaConsumer(
        CODE_SOURCES_METRICS_TOPIC,
        bootstrap_servers=KAFKA_BROKER_URL,
        value_deserializer=lambda value: json.loads(value),
    )
    producer = KafkaProducer(
        bootstrap_servers=KAFKA_BROKER_URL,
        value_serializer=lambda value: json.dumps(value).encode('utf-8'),
    )

    for message in consumer:
        metrics_payload: dict = message.value
        project_name = metrics_payload.pop('project_name', "Unknown_project")
        filename = metrics_payload.pop('filename', "Unknown_filename")
        input_data = prepare_data(metrics_payload)
        predection = predict(input_data, model)
        predection, percentage = manage_predection(predection)
        output_payload = metrics_payload | {"CLASS": predection, "percentage": int(percentage), "project_name" : project_name, "filename": filename}
        producer.send(PREDECTION_RESULTS_TOPIC, value=output_payload)

        logger.warning(f"---DEEP-learning-- >  {PREDECTION_RESULTS_TOPIC}, {output_payload}")