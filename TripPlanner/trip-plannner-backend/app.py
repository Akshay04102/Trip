from pyexpat import model
import re
import uuid
import os
import numpy as np
from flask import Flask, request, jsonify
import pandas as pd
import requests
from firebase_admin import credentials, initialize_app, db
from dotenv import load_dotenv  # Import dotenv to load environment variables
from flask_cors import CORS  # Import CORS
from datetime import datetime

from sklearn.calibration import LabelEncoder
from sklearn.tree import DecisionTreeClassifier  # Import datetime to store trip date

# Load environment variables from the .env file
load_dotenv()  # This loads variables from your .env file into the environment

# Initialize Flask app and Firebase
app = Flask(__name__)

# Enable CORS for all routes, only allowing requests from localhost:5173
CORS(app, resources={r"/*": {"origins": "*"}})

# Load Firebase Admin SDK credentials
cred = credentials.Certificate("trip-planner-12345-firebase-adminsdk-fbsvc-48aede86fe.json")
initialize_app(cred, {'databaseURL': 'https://trip-planner-12345-default-rtdb.firebaseio.com/'})

# Get the Gomaps API key from the environment variables
GOMAPS_API_KEY = os.getenv("GOMAPS_API_KEY")

# Function to sanitize the email for Firebase paths
def sanitize_email(email):
    # Replace invalid Firebase characters with underscores
    return email.replace('.', '_').replace('#', '_').replace('$', '_').replace('[', '_').replace(']', '_')

@app.route('/store-user-email', methods=['POST'])
def store_user_email():
    data = request.get_json()
    email = data.get('email')
    print(email, "email")

    if email:
        return jsonify({"message": "Email stored successfully!"}), 200
    else:
        return jsonify({"message": "Email is required"}), 400

def generate_trip_id():
    return str(uuid.uuid4())  # Generate a random unique UUID as string

# Function to get latitude and longitude from the place ID
def get_lat_lon_from_place_id(place_id):
    url = f"https://maps.gomaps.pro/maps/api/place/details/json?place_id={place_id}&key={GOMAPS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    if 'result' in data:
        lat = data['result']['geometry']['location']['lat']
        lon = data['result']['geometry']['location']['lng']
        return lat, lon
    return None, None

# Function to get nearest hotels with updated variables
def get_nearest_hotels(lat, lon):
    print("long", lon)
    print("lat", lat)
    url = f"https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=5000&type=restaurant|hotels&key={GOMAPS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    hotels = []
    unqid = 0

    if 'results' in data:
        # Filter and sort by rating
        sorted_results = sorted(data['results'], key=lambda x: x.get('rating', 0), reverse=True)[:6]
        for result in sorted_results:
            hotel_data = {
                "name": result["name"],
                "rating": result.get("rating", 0),
                "vicinity": result.get("vicinity", ""),
                "place_id": result["place_id"],
                "photoId": result.get("photos", [])[0]["photo_reference"] if result.get("photos") else None,  # Extract photo_reference
                "maps": result.get("photos", [])[0]["html_attributions"][0] if result.get("photos") else None  # Extract maps attribution
            }
            unqid += 1
            hotels.append(hotel_data)
    return hotels

# Function to get nearest tourist places
def get_nearest_places(lat, lon,noOfDays):
    print("long", lon)
    print("lat", lat)
    url = f"https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=5000&type=tourist_attraction&key={GOMAPS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    hotels = []
    unqid = 0

    if 'results' in data:
        # Filter and sort by rating
        noOfDaysInt=(int(noOfDays[0])*3-1)
        sorted_results = sorted(data['results'], key=lambda x: x.get('rating', 0), reverse=True)[:noOfDaysInt]
        for result in sorted_results:
            hotel_data = {
                "name": result["name"],
                "rating": result.get("rating", 0),
                "vicinity": result.get("vicinity", ""),
                "place_id": result["place_id"],
                "photoId": result.get("photos", [])[0]["photo_reference"] if result.get("photos") else None,  # Extract photo_reference
                "maps": result.get("photos", [])[0]["html_attributions"][0] if result.get("photos") else None  # Extract maps attribution
            }
            unqid += 1
            hotels.append(hotel_data)
    return hotels

# Function to fetch hotel photos using photo reference
def get_hotel_photos(photo_reference):
    url = f"https://maps.gomaps.pro/maps/api/place/photo?photo_reference={photo_reference}&maxwidth=400&key={GOMAPS_API_KEY}"
    response = requests.get(url)
    return response.url  # Returns the URL of the image

# Function to store data in Firebase
def store_trip_data(email, trip_id, trip_data):
    sanitized_email = sanitize_email(email)  # Sanitize the email
    ref = db.reference(f"users/{sanitized_email}/trips/{trip_id}")
    print("Storing data:", trip_data)
    ref.set(trip_data)

# Endpoint to handle POST requests for generating trip

@app.route('/generate-trip', methods=['POST'])
def generate_trip():
    data = request.get_json()
    email = data.get('email')
    
      # Extract the email and trip data
    email = data.get('email')
    sanitized_email = sanitize_email(email)  # Sanitize the email
    trip_id = data.get('tripId', generate_trip_id())  # Use provided tripId or generate a new one
    destination_place_id = data.get('destinationPlaceId')

    # Step 1: Get latitude and longitude from the place ID
    lat, lon = get_lat_lon_from_place_id(destination_place_id)
    if lat is None or lon is None:
        return jsonify({"message": "Invalid place ID."}), 400
    
    noOfDays=data.get('noOfDays'),
    # Step 2: Get the nearest hotels with photoId and maps
    hotels = get_nearest_hotels(lat, lon)
    nearest = get_nearest_places(lat, lon,noOfDays)

    # Step 3: Update hotel details with proper photoId and maps
    for hotel in hotels:
        if hotel.get("photoId"):
            hotel["image_url"] = get_hotel_photos(hotel["photoId"])
            print(hotel["image_url"])
    # Step 3: Update nearest details with proper photoId and maps

    for near in nearest:
        if near.get("photoId"):
            near["image_url"] = get_hotel_photos(near["photoId"])
            print(near["image_url"])


    if not email:
        return jsonify({"message": "Email is required"}), 400
    
    trip_id = generate_trip_id()
    trip_date = data.get('tripDate')
    
    transport_data = get_transport_data(data.get('source'), data.get('destination'), trip_date,data.get('budget'),data.get('traveller'))
    predicted_mode = predict_transport_mode(data.get('traveller'),data.get('budget'))

    trip_data = {
        "userEmail": email,
        "source": data.get('source'),
        "destination": data.get('destination'),
        "number_of_days": data.get('noOfDays'),
        "budget": data.get('budget'),
        "traveller": data.get('traveller'),
        "destination_place_id": data.get('destinationPlaceId'),
        "trip_date": trip_date,
        "transport_options": transport_data,
        "hotels": hotels,
        "nearByPlaces":nearest,
        "predictedMode": predicted_mode
    }
    store_trip_data(email, trip_id, trip_data)
    
    return jsonify({
        "message": "Trip data stored successfully",
        "data": trip_data
    }), 200


def store_trip_data(email, trip_id, trip_data):
    sanitized_email = sanitize_email(email)  # Sanitize email
    ref = db.reference(f"users/{sanitized_email}/trips/{trip_id}")  
    print("Storing data at:", f"users/{sanitized_email}/trips/{trip_id}")  
    print("Data being stored:", trip_data)
    print("****************************************************************************************************************************88")
    ref.set(trip_data)  


@app.route('/get-trips', methods=['GET'])
def get_trips():
    email = request.args.get('email')
    print(email);
    if not email:
        return jsonify({"message": "Email is required"}), 400

    sanitized_email = sanitize_email(email)
    ref = db.reference(f"users/{sanitized_email}/trips")
    trips = ref.get()

    if not trips:
        return jsonify({"message": "No trips found."}), 404

    return jsonify({"trips": trips}), 200


# AI MODEL
import os
script_dir = os.path.dirname(os.path.realpath(__file__))  # Gets the directory where the script is located

# Use relative path based on script's directory
train_df = pd.read_csv(os.path.join(script_dir, 'train_data.csv'))
bus_df = pd.read_csv(os.path.join(script_dir, 'bus_data.csv'))
flight_df = pd.read_csv(os.path.join(script_dir, 'flight_data.csv'))

# Standardize train data
train_df = train_df.rename(columns={
    "From": "source", "To": "destination", "Train Name": "train_name",
    "Train No": "train_no", "Duration": "duration", "Type": "type",
    "Departure Time": "departure_time", "Arrival Time": "arrival_time",
    "Price Category": "price_category", "Train Date": "train_date"
})

# Standardize bus data
bus_df = bus_df.rename(columns={
    "Source": "source", "Destination": "destination", "Operator": "operator",
    "Distance (Kms)": "distance_kms", "Duration": "duration", "Bus Type": "bus_type",
    "Departure": "departure", "Arrival": "arrival", "Bus Price": "bus_price",
    "Bus Arrival Date": "bus_arrival_date"
})

# Standardize flight data
flight_df = flight_df.rename(columns={
    "Source": "source", "Destination": "destination", "Flight Number": "flight_number",
    "Airline": "airline", "Duration": "duration", "Departure Time": "departure_time",
    "Arrival Time": "arrival_time", "Flight Type": "flight_type", "Flight Category": "flight_category",
    "Flight Price": "flight_price", "Flight Date": "flight_date"
})

def get_transport_data(source, destination, date,budget,traveller):
    train_data = train_df[(train_df['source'] == source) & (train_df['destination'] == destination) & (train_df['train_date'] == date)].to_dict(orient='records')
    bus_data = bus_df[(bus_df['source'] == source) & (bus_df['destination'] == destination) & (bus_df['bus_arrival_date'] == date)].to_dict(orient='records')
    flight_data = flight_df[(flight_df['source'] == source) & (flight_df['destination'] == destination) & (flight_df['flight_date'] == date)].to_dict(orient='records')
    print(train_data)
    print(bus_data)
    print(flight_data)
    print("Budget :::::::::::::: ",budget)

    predicted_mode = predict_transport_mode(traveller,budget)
    print("predicted value:::::::::::::: ",predicted_mode)
    return {"train": train_data, "bus": bus_data, "flight": flight_data}

# Load dataset from CSV
df = pd.read_csv("cleaned_travel_dataset.csv")

# Function to extract the number from the "Traveller" column
def extract_number(value):
    match = re.search(r'\d+', str(value))  # Extract first number found
    return int(match.group()) if match else 1  # Default to 1 if no number found

# Convert Traveller column to integer
df["Traveller"] = df["Traveller"].apply(extract_number)

# Encode categorical features
budget_encoder = LabelEncoder()
mode_encoder = LabelEncoder()

df["BudgetEncoded"] = budget_encoder.fit_transform(df["Budget"])
df["ModeEncoded"] = mode_encoder.fit_transform(df["Mode"])

# Prepare training data
X = df[["Traveller", "BudgetEncoded"]].values
y = df["ModeEncoded"].values

# Train Decision Tree model
model = DecisionTreeClassifier()
model.fit(X, y)

def predict_transport_mode(traveller, budget):
    # Extract numeric part from traveller input
    try:
        traveller = extract_number(traveller)  # Ensure it's an integer
    except ValueError:
        return "Invalid traveller value"

    # Check if the budget is in the trained encoder
    if budget not in budget_encoder.classes_:
        return f"Unseen budget label encountered: {budget}"

    # Encode input values
    budget_encoded = budget_encoder.transform([budget])[0]

    # Prepare input data for prediction
    input_data = np.array([[traveller, budget_encoded]])

    # Make prediction
    prediction = model.predict(input_data)
    mode_predicted = mode_encoder.inverse_transform(prediction)[0]
    
    print("This is mode:", mode_predicted)

    return mode_predicted  #  

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000)

