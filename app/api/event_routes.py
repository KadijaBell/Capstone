from flask import Blueprint, request, jsonify
from app.models import  Event,User,Service,Agency, db
from flask_login import current_user, login_required

event_routes = Blueprint('events', __name__)

#GET
@event_routes.route('/', methods=['GET'])
@login_required
def list_events():
    try:
        import logging
        logging.info(f"Current User: {current_user.__dict__}")

        # Check if role exists
        if not hasattr(current_user, 'role') or not current_user.role:
            return jsonify({"error": "User role not set. Please check user data."}), 400

        # Logic for admin and user
        if current_user.role == 'admin':
            events = Event.query.all()
        elif current_user.role == 'user':
            events = Event.query.filter_by(client_id=current_user.id).all()
        else:
            return jsonify({"error": "Invalid user role"}), 403

        return {'events': [event.to_dict() for event in events]}, 200

    except Exception as error:
        logging.error(f"Error fetching events: {error}")
        return jsonify({"error": f"Unable to fetch events: {str(error)}"}), 500

@event_routes.route('/approved', methods=['GET'])
@login_required
def get_approved_events():
    approved_events = Event.query.filter_by(status='approved').all()
    return {'events': [event.to_dict() for event in approved_events]}

@event_routes.route('/my-events', methods=['GET'])
@login_required
def get_user_events():

    if current_user.role != 'user':
        return {'error': 'Unauthorized'}, 403

    user_events = Event.query.filter_by(client_id=current_user.id).all()
    return {'events': [event.to_dict() for event in user_events]}

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
def update_event(id):
    event = Event.query.get_or_404(id)
    # Check
    if event.client_id != current_user.id and current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized access to update this event'}), 403
    try:
        data = request.get_json()

        # Set editing restrictions
        if current_user.role != 'admin':
            allowed_fields = ['title', 'description']
            for field in allowed_fields:
                if field in data:
                    setattr(event, field, data[field])
        else:
            # Admin can update any field
            for key, value in data.items():
                setattr(event, key, value)

        db.session.commit()
        return event.to_dict(), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Unable to update event', 'details': str(e)}), 500

#DELETE
@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):

    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'})

#Dashboard
@event_routes.route('/dashboard', methods=['GET'])
@login_required
def user_dashboard():
    """
    Dashboard route for users to see their events and metrics
    """
    try:
        if current_user.role != 'user':
            return jsonify({'error': 'Unauthorized access'}), 403

        # Get user's events
        user_events = Event.query.filter_by(client_id=current_user.id).all()

        # Calculate metrics
        total_events = len(user_events)
        pending_events = sum(1 for event in user_events if event.status == 'pending')
        approved_events = sum(1 for event in user_events if event.status == 'approved')
        rejected_events = sum(1 for event in user_events if event.status == 'rejected')

        return jsonify({
            "role": "user",
            "dashboard_data": {
                "total_events": total_events,
                "pending_events": pending_events,
                "approved_events": approved_events,
                "rejected_events": rejected_events,
            },
            "events": [event.to_dict() for event in user_events]
        }), 200

    except Exception as e:
        print(f"Dashboard error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
