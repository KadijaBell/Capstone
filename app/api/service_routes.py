from flask import Blueprint, jsonify
from app.models import Service

service_routes = Blueprint('services', __name__)

@service_routes.route('/', methods=['GET'])
def get_services():
    """
    Retrieve all services.
    """
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services])
