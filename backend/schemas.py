from pydantic import BaseModel

class Features(BaseModel):
    Age: float
    Fare: float      # float not int — Fare has decimals e.g 7.25
    Pclass: int
    SibSp: int
    Parch: int
    Sex: str         # 'male' or 'female' — pipeline encodes it
    Embarked: str    # 'S', 'C' or 'Q' — pipeline encodes it

class PredictedResponse(BaseModel):
    survived: int
    formatted: str