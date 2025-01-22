from flask import Blueprint, request, jsonify
from app.models import  Event,User,Service,Agency, db
from flask_login import current_user, login_required

event_routes = Blueprint('events', __name__)

#GET
@event_routes.route('/', methods=['GET'])
def list_events():
    try:

        events = Event.query.all()
        return {'events': [event.to_dict() for event in events]}, 200
    except Exception as e:
        print(f"Error fetching events: {str(e)}")
        return jsonify({"error": "Unable to list events"}), 500


#POST
@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    """
    Create a new event request.
    """
    if current_user.role != 'user':
        return {'error': 'Unauthorized'}, 403

    data = request.get_json()
    new_event = Event(
        title=data['title'],
        description=data['description'],
        type=data.get('type', 'event'),
        status='pending',
        client_id=current_user.id
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201


#PUT
@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event_status(id):
    """
    Update the status of an event (admin-only).
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    event = Event.query.get_or_404(id)
    data = request.get_json()
    if 'status' in data:
        event.status = data['status']
        db.session.commit()
    return jsonify(event.to_dict())


#DELETE
@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    """
    Delete an event (admin-only).
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'})
