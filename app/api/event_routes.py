from flask import Blueprint, request, jsonify
from app.models import  Event,User,Service,Agency, db, ContactSubmission
from flask_login import current_user, login_required
from datetime import datetime
from flask_cors import cross_origin

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


@event_routes.route('/public', methods=['GET'])
def get_public_events():
    """
    Get all approved public events
    """
    try:
        events = Event.query.filter_by(status='approved').all()
        return jsonify({'events': [event.to_dict() for event in events]}), 200
    except Exception as e:
        return {'error': f'Error retrieving events: {str(e)}'}, 500


@event_routes.route('/<int:id>', methods=['GET'])
def get_event(id):
    """
    Get a specific event by id
    """
    try:
        event = Event.query.get(id)
        if not event:
            return jsonify({'error': 'Event not found'}), 404
        return jsonify({'event': event.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': f'Error retrieving event: {str(e)}'}), 500

#POST
@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    """
    Create a new event or service request
    """
    try:
        # Debug logging
        print("Current user:", current_user, current_user.is_authenticated)

        if not current_user.is_authenticated:
            return {"error": "User not authenticated"}, 401

        data = request.get_json()
        print("Received event data:", data)

        new_event = Event(
            title=data.get('title'),
            organization=data.get('organization'),
            location=data.get('location'),
            date=datetime.strptime(data.get('date'), '%Y-%m-%d') if data.get('date') else None,
            description=data.get('description'),
            type=data.get('type', 'event'),  # Default to 'event' if not specified
            status='pending',
            client_id=current_user.id,
            event_type=data.get('eventType'),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        print("New event object:", {
            'title': new_event.title,
            'client_id': new_event.client_id,
            'status': new_event.status,
            'type': new_event.type
        })

        db.session.add(new_event)
        db.session.commit()

        # Return the created event and updated metrics
        return {
            'event': new_event.to_dict(),
            'message': 'Event created successfully'
        }, 201

    except Exception as e:
        print("Error creating event:", str(e))
        db.session.rollback()
        return {"error": str(e)}, 500

@event_routes.route('/event-requests', methods=['POST'])
def create_event_request():
    """
    Create a new event request from non-authenticated users
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

@event_routes.route('/events/<int:id>', methods=['PATCH'])
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
def get_dashboard():
    try:
        print("Fetching dashboard for user:", current_user.id)  # Debug log

        # Get events for the current user
        events = Event.query.filter_by(client_id=current_user.id).all()

        print("Found events:", [e.to_dict() for e in events])  # Debug log

        # Calculate metrics
        total = len(events)
        pending = sum(1 for e in events if e.status == 'pending')
        approved = sum(1 for e in events if e.status == 'approved')
        denied = sum(1 for e in events if e.status == 'denied')

        response_data = {
            "events": [e.to_dict() for e in events],
            "metrics": {
                "total": total,
                "pending": pending,
                "approved": approved,
                "denied": denied
            }
        }

        print("Sending dashboard data:", response_data)  # Debug log
        return response_data

    except Exception as e:
        print("Dashboard Error:", str(e))
        return {"error": str(e)}, 500
