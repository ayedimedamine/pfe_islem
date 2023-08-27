import json
import os
from kafka import KafkaConsumer, KafkaProducer
from objectManager import read_file
import logging
from io import StringIO
import pandas as pd 
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
OBJECT_FILE_TOPIC = os.environ.get('OBJECT_FILE_TOPIC')
PREDECTION_TOPIC = os.environ.get('PREDECTION_TOPIC')


if __name__ == '__main__':
    logger.info("Starting Metrics Generator Module Server")
    consumer = KafkaConsumer(
        OBJECT_FILE_TOPIC,
        bootstrap_servers=KAFKA_BROKER_URL,
        value_deserializer=lambda value: json.loads(value),
    )
    producer = KafkaProducer(
        bootstrap_servers=KAFKA_BROKER_URL,
        value_serializer=lambda value: json.dumps(value).encode('utf-8'),
    )
    for message in consumer:
        file_metadata: dict = message.value

        file_path :str= file_metadata["Key"]
        try :
            bucket_name, project_name, filename_csv = file_path.split('/')
            bytes_data = read_file(file_path.split('/',1)[1])
            content = bytes_data.data.decode("utf-8")
            data = StringIO(content) 
            df = pd.read_csv(data)
            for metrics_attribute in df.to_dict(orient="records"):
                logger.debug(metrics_attribute)
                if metrics_attribute is None : 
                    continue
                else : 
                    producer.send(PREDECTION_TOPIC, value=metrics_attribute)
                logger.warning(f"---METRICS RESULTS-- > {metrics_attribute} , {filename_csv}")

        except ValueError as e:
            logger.warning("DISCARD FILE {}".format(file_path))
            continue