from flask import Blueprint, jsonify, request
from app.models import Event, User, Service, Agency,Metric, ContactSubmission, Notification, db
from flask_login import current_user, login_required
from datetime import datetime



admin_routes = Blueprint('admin', __name__)

#GET
@admin_routes.route('/events', methods=['GET'])
@login_required
def get_admin_events():
    """
    Retrieve all event requests for admin review.
    """
    try:
        if current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        status = request.args.get('status')
        events_query = Event.query

        if status:
            events = events_query.filter(Event.status == status).all()
        else:
            events = events_query.all()

        print(f"Found {len(events)} events") # Debug log
        return jsonify({
            'events': [event.to_dict() for event in events],
            'count': len(events)
        })

    except Exception as e:
        print(f"Error in get_admin_events: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@admin_routes.route('/contact-submissions', methods=['GET'])
@login_required
def get_contact_submissions():
    """
    Get all contact form submissions (admin only)
    """
    try:
        if current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        submissions = ContactSubmission.query.order_by(
            ContactSubmission.created_at.desc()
        ).all()

        print(f"Found {len(submissions)} contact submissions") # Debug log
        return jsonify({
            'submissions': [sub.to_dict() for sub in submissions],
            'count': len(submissions)
        })

    except Exception as e:
        print(f"Error in get_contact_submissions: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@admin_routes.route('/metrics', methods=['GET'])
@login_required
def get_metrics():
    """
    Retrieve all metrics.
    """
    metrics = Metric.query.all()
    return jsonify([metric.to_dict() for metric in metrics]),200

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



@admin_routes.route('/contact-submissions', methods=['POST'])
def submit_contact():
    """
    Handle contact form submissions from non-authenticated users
    """
    data = request.get_json()

    # Create a new contact submission
    new_submission = ContactSubmission(
        name=data.get('name'),
        email=data.get('email'),
        subject=data.get('subject'),
        message=data.get('message'),
        status='pending',
        created_at=datetime.utcnow()
    )

    db.session.add(new_submission)
    db.session.commit()

    return jsonify({'message': 'Contact submission received successfully'}), 200


@admin_routes.route('/messages/<int:message_id>/reply', methods=['POST'])
@login_required
def reply_to_message(message_id):
    """
    Handle admin replies to contact submissions
    """
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        data = request.get_json()
        message = data.get('message')

        # Find the contact submission
        submission = ContactSubmission.query.get_or_404(message_id)

        # Update the submission status and add reply
        submission.status = 'replied'
        submission.admin_reply = message
        submission.replied_at = datetime.utcnow()
        submission.replied_by = current_user.id

        db.session.commit()

        return jsonify({'message': 'Reply sent successfully'}), 200

    except Exception as e:
        print(f"Error in reply_to_message: {str(e)}")
        return jsonify({'error': 'Failed to send reply'}), 500

@admin_routes.route('/events/<int:event_id>/message', methods=['POST'])
@login_required
def send_message(event_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    message_content = data.get('message')

    if not message_content:
        return jsonify({'error': 'Message content is required'}), 400

    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    new_notification = Notification(
        user_id=event.client_id,
        event_id=event.id,
        message=message_content,
        created_at=datetime.utcnow()
    )

    db.session.add(new_notification)
    db.session.commit()

    return jsonify(new_notification.to_dict()), 201

#PUT/PATCH
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

@admin_routes.route('/events/<int:event_id>/approve', methods=['PATCH'])
@login_required
def approve_event(event_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized access'}), 403
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    event.status = 'approved'
    db.session.commit()
    return event.to_dict()

@admin_routes.route('/events/<int:event_id>/reject', methods=['PATCH'])
@login_required
def reject_event(event_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized access'}), 403
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    event.status = 'denied'
    db.session.commit()
    return event.to_dict()


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
    print(f"Admin dashboard access - User: {current_user}, Role: {current_user.role}")  # Debug log
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
        pending_events = Event.query.filter(Event.status == 'pending').count()
        users_count = User.query.count()
        total_services = Service.query.count()
        events = Event.query.all()
        pending_events_list = Event.query.filter(Event.status == 'pending').all()

    return {
            "role": "admin",
            "dashboard_data": {
                "total_events": total_events,
                "pending_events": pending_events,
                "users_count": users_count,
                "total_services": total_services,
            },
            "pending_events": [event.to_dict() for event in pending_events_list],
            "events": [event.to_dict() for event in events],
        }
