FROM diyor28/tensorflow:2.8.4-py39
# trunk-ignore(hadolint/DL3013)
# trunk-ignore(hadolint/DL3042)
RUN python -m pip install --upgrade pip

WORKDIR /usr/app

COPY ./requirements.txt ./
# trunk-ignore(hadolint/DL3042)
RUN pip3 install -r requirements.txt

COPY ./ ./

CMD ["python3", "app.py"]