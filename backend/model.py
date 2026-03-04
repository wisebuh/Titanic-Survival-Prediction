import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OrdinalEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer
import joblib

# ------- Dataset --------
np.random.seed(42)

# Define columns
num_cols = ['Age', 'Fare', 'Pclass', 'SibSp', 'Parch']
cat_cols = ['Sex', 'Embarked']


train = pd.read_csv('dataset/train.csv')
test = pd.read_csv('dataset/test.csv')

# ---- Pipeline: scale + model ---


# --- Train split ---
x = train.drop('Survived', axis=1)
y = train['Survived']
x_train,x_val, y_train, y_val = train_test_split(x,y, test_size=0.2)

# Preprocessing
preprocessor = ColumnTransformer(transformers=[
    ('num', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),  # fill missing Age/Fare
        ('scaler', StandardScaler())
    ]), num_cols),
    ('sex', OrdinalEncoder(), ['Sex']),
    ('embarked', OneHotEncoder(drop='first', sparse_output=False), ['Embarked'])
])

# Full pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', RandomForestClassifier(random_state=42))
])

# Select only needed columns
features = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']
features = train[features].assign(Fare=np.log1p(train_df['Fare']))
x = features
y = train['Survived']

x_train, x_val, y_train, y_val = train_test_split(x, y, test_size=0.2, random_state=42)

pipeline.fit(x_train, y_train)
print(classification_report(y_val, pipeline.predict(x_val)))

# Save
joblib.dump(pipeline, "model.pkl")
print("Model saved to model.pkl")
