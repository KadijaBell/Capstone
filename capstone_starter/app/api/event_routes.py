from flask import Blueprint, request, jsonify
from app.models import  Event, db
from flask_login import current_user, login_required

event_routes = Blueprint('events', __name__)

@event_routes.route('/events', methods=['GET'])
def get_events():
    """
    Retrieve all events or filter by type and status.
    """
    event_type = request.args.get('type')
    status = request.args.get('status')
    query = Event.query
    if event_type:
        query = query.filter(Event.type == event_type)
    if status:
        query = query.filter(Event.status == status)
    events = query.all()
    return jsonify([event.to_dict() for event in events])

@event_routes.route('/events', methods=['POST'])
@login_required
def create_event():
    """
    Create a new event request.
    """
    data = request.get_json()
    new_event = Event(
        title=data['title'],
        description=data['description'],
        type=data.get('type', 'event'),  # Default type is 'event'
        status='pending',
        client_id=current_user.id
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201

@event_routes.route('/events/<int:id>', methods=['PATCH'])
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

@event_routes.route('/events/<int:id>', methods=['DELETE'])
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
