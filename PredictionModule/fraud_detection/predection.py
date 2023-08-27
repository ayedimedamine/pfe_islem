from joblib import load
from pandas import DataFrame


def loadModel(model_path="fraud_detection/tree_over.joblib"):
    return load(model_path)


def prepare_data(data: dict):
    input_data = DataFrame(data, index=[0])
    print(input_data)
    return input_data


def predict(data, model) -> int:
    prediction = model.predict(data)
    return prediction


def manage_predection(predection) -> str:
    if predection[0] == 0:
        return "NON FRAUD", predection[0]
    else:
        return "FRAUD", predection[0]
