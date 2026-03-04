from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib

from schemas import Features, PredictedResponse
from predictor import predict_survival

app = FastAPI(title="Survival Rate Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load model once when server starts
with open("model.pkl", "rb") as f:
    model = joblib.load(f)

@app.get("/")
def root():
    return {"status": "API is running"}

@app.post("/predict", response_model=PredictedResponse)
def predict(features: Features):
    survived = predict_survival(model, features)
    return {
        "survived": int(survived),
        "formatted": "Survived" if survived == 1 else "Did not survive"
    }

