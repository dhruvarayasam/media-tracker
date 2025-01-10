from flask import Blueprint, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

main_routes = Blueprint('main_routes', __name__)
uri = "mongodb+srv://dhruvarayasam:uSMk1TckawHmcpnp@media-tracker-cluster.wegsn.mongodb.net/?retryWrites=true&w=majority&appName=media-tracker-cluster"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged Mongo deployment. Successful connection.")
except Exception as e:
    print(e)


@main_routes.route('/')
def home():
    return "generic api response for media tracker"


# example endpoints for get and post request
# @main_routes.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Here is some data!"})

# @main_routes.route('/api/data', methods=['POST'])
# def post_data():
#     data = request.get_json()
#     return jsonify({"received_data": data}), 201



