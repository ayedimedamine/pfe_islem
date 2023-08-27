FROM tiangolo/uvicorn-gunicorn:python3.11

WORKDIR /app

ADD ./requirements.txt ./
RUN pip install -r requirements.txt
ADD ./ ./


# CMD ["uvicorn" 'app:app' '--host' '0.0.0.0' '--port' '80']
