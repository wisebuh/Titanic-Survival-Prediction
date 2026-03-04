import pandas as pd
from schemas import Features

def predict_survival(model, features: Features) -> int:
    X = pd.DataFrame([{
        'Pclass': features.Pclass,
        'Sex': features.Sex,
        'Age': features.Age,
        'SibSp': features.SibSp,
        'Parch': features.Parch,
        'Fare': features.Fare,
        'Embarked': features.Embarked
    }])

    survived = model.predict(X)[0]
    return int(survived)