from flask import Blueprint, jsonify
from app.models import Agency

agency_routes = Blueprint('agencies', __name__)

@agency_routes.route('/', methods=['GET'])
def get_agencies():
    """
    Retrieve all agencies.
    """
    agencies = Agency.query.all()
    return jsonify([agency.to_dict() for agency in agencies]),200
