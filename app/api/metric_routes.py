from flask import Blueprint, jsonify
from app.models import Metric

metric_routes = Blueprint('metrics', __name__)

@metric_routes.route('/', methods=['GET'])
def get_metrics():
    """
    Retrieve all metrics.
    """
    metrics = Metric.query.all()
    return jsonify([metric.to_dict() for metric in metrics]),200
