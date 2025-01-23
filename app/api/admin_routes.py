from flask import Blueprint, jsonify, request
from app.models import Event, User, Service, Agency, db
from flask_login import current_user, login_required


admin_routes = Blueprint('admin', __name__)

#GET
@admin_routes.route('/events', methods=['GET'])
@login_required
def get_admin_events():
    """
    Retrieve all event requests for admin review.
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    status = request.args.get('status')
    events_query = Event.query

    if status:
        events = events_query.filter(Event.status == status)

    else:
        events = events_query.all()
    return {'events': [event.to_dict() for event in events]}

#POST
@admin_routes.route('/contact', methods=['POST'])
@login_required
def contact_client():
    """
    Admin contacts a client regarding their request.
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    data = request.get_json()
    # Simulate contact logic (e.g., send email or message)
    client_id = data.get('client_id')
    message = data.get('message')
    return {'status': f'Message sent to client {client_id}: {message}'}

#PUT
@admin_routes.route('/events/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
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
@admin_routes.route('/events/<int:id>', methods=['DELETE'])
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


#Dashboard
@admin_routes.route('/dashboard', methods=['GET'])
@login_required
def admin_dashboard():
    """
    Dashboard route for both users and admins.
    - Regular users (clients) see only their events.
    - Admins see all events and statistics.
    """
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized access'}), 403

    if current_user.role == 'admin':
        # Admin
        total_events = Event.query.count()
        pending_events = Event.query.filter_by(status='pending').count()
        users_count = User.query.count()
        total_services = Service.query.count()
        events = Event.query.all()

        return {
            "role": "admin",
            "dashboard_data": {
                "total_events": total_events,
                "pending_events": pending_events,
                "users_count": users_count,
                "total_services": total_services,
            },
            "events": [event.to_dict() for event in events],
        }
