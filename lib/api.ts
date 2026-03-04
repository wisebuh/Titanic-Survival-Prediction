const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Features {
    Age: number;
    Fare: number;
    Pclass: number;
    SibSp: number;
    Parch: number;
    Sex: string;
    Embarked: string;
}

export interface PredictionResponse {
    survived: number;
    formatted: string;
}

export async function checkHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/`);
        return res.ok;
    } catch {
        return false;
    }
}

export async function predict(features: Features): Promise<PredictionResponse> {
    const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
    });

    if (!res.ok) throw new Error(`Prediction failed: ${res.statusText}`);
    
    return res.json();
}