from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/:id/events', methods=['GET'])
@login_required
def get_user_events(id):
    user = User.query.get(id)
    return {'events': [event.to_dict() for event in user.events]}


@user_routes.route('/contact-admin', methods=['POST'])
@login_required
def contact_admin():
    """
    Send a message to admin regarding an event
    """
    data = request.json
    event_id = data.get('event_id')
    message = data.get('message')

    return jsonify({
        "message": "Message sent successfully",
        "status": "success"
    })
