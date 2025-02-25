from flask import Blueprint, jsonify, request
from app.models import Event, User, Service, Agency,Metric, ContactSubmission, Notification, Message, db
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


@admin_routes.route('/messages/thread/<int:message_id>', methods=['GET'])
@login_required
def get_thread(message_id):
    """
    Retrieve a 'thread' by message_id.
    This can be done by an approach such as:
    - all messages with the same event_id
    - or all messages with the same 'parent_id'
    Modify logic to your preference.
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    parent_message = Message.query.get_or_404(message_id)
    # For simplicity, let's assume a thread is all messages that share the same event_id:
    thread_messages = Message.query.filter_by(event_id=parent_message.event_id).all()

    return jsonify([m.to_dict() for m in thread_messages]), 200


@admin_routes.route('/users', methods=['GET'])
@login_required
def get_users():
    """Get all users for messaging"""
    try:
        if current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        users = User.query.all()
        return jsonify({
            'users': [{
                'id': user.id,
                'email': user.email,
                'username': user.username
            } for user in users]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/messages', methods=['GET'])
@login_required
def get_admin_messages():
    """
    Get all messages for admin
    """
    try:
        if current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        messages = Message.query.order_by(Message.created_at.desc()).all()

        return jsonify({
            'messages': [message.to_dict() for message in messages],
            'count': len(messages)
        }), 200
    except Exception as e:
        print(f"Error in get_admin_messages: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


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
def admin_reply_to_message(message_id):
    try:
        data = request.get_json()
        content = data.get('content')

        if not content:
            return jsonify({'error': 'Content is required'}), 400

        # Get the original message
        original_message = Message.query.get(message_id)
        if not original_message:
            return jsonify({'error': 'Message not found'}), 404

        # Check if this message is part of a thread
        thread_id = original_message.thread_id or original_message.id

        # Create new reply message
        new_reply = Message(
            content=content,
            sender_id=current_user.id,
            recipient_id=original_message.sender_id,
            thread_id=thread_id,  # Use existing thread_id
            is_admin_message=True,
            status='unread'
        )

        db.session.add(new_reply)
        db.session.commit()

        # Return the entire thread
        thread_messages = Message.query.filter(
            (Message.id == thread_id) |
            (Message.thread_id == thread_id)
        ).order_by(Message.created_at).all()

        return jsonify({
            'message': new_reply.to_dict(),
            'thread': [msg.to_dict() for msg in thread_messages]
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

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
        event_id=event_id,
        message=message_content,
        type='admin_message'
    )

    db.session.add(new_notification)
    db.session.commit()

    return jsonify(new_notification.to_dict()), 201

@admin_routes.route('/messages', methods=['POST'])
@login_required
def create_message():
    """Create a new message"""


    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403
    try:
        data = request.get_json()

        message = Message(
            content=data.get('content'),
            sender_id=current_user.id,
            event_id=data.get('event_id'),
            recipient_id=data.get('user_id'),
            is_admin_message=True,
            status='read'
        )

        db.session.add(message)
        db.session.commit()
        return jsonify(message.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/events/<int:event_id>/edit-request', methods=['POST'])
@login_required
def request_event_edit(event_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        data = request.get_json()
        event = Event.query.get_or_404(event_id)

        # Update event
        event.edit_requested = True
        event.edit_message = data.get('message')

        # Create notification for user
        notification = Notification(
            user_id=event.client_id,
            event_id=event_id,
            message=f"Edit requested for your event '{event.title}'",
            type="request_edit",
            created_at=datetime.utcnow(),
            read=False
        )

        # Create message for the edit request
        message = Message(
            sender_id=current_user.id,
            recipient_id=event.client_id,
            event_id=event_id,
            content=data.get('message'),
            # type='edit_request',
            status='unread',
            created_at=datetime.utcnow(),
            is_admin_message=True
        )

        db.session.add(notification)
        db.session.add(message)
        db.session.commit()

        return jsonify({
            'message': 'Edit request sent successfully',
            'event': event.to_dict(),
            'notification': notification.to_dict(),
            'thread_message': message.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error in request_event_edit: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/events/<int:event_id>/<action>', methods=['POST'])
@login_required
def handle_event_action(event_id, action):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        event = Event.query.get_or_404(event_id)
        data = request.get_json()

        if action == 'approve':
            event.status = 'approved'
            message_content = f"Your event '{event.title}' has been approved"
        elif action == 'deny':
            event.status = 'denied'
            event.denial_reason = data.get('reason', '')
            message_content = f"Your event '{event.title}' has been denied. Reason: {event.denial_reason}"
        else:
            return jsonify({'error': 'Invalid action'}), 400

        # Create notification
        notification = Notification(
            user_id=event.client_id,
            event_id=event_id,
            message=message_content,
            type=f'request_{action}',
            created_at=datetime.utcnow(),
            read=False
        )

        # Create message
        message = Message(
            sender_id=current_user.id,
            recipient_id=event.client_id,
            event_id=event_id,
            content=message_content,
            status='unread',
            created_at=datetime.utcnow(),
            is_admin_message=True
        )

        db.session.add(notification)
        db.session.add(message)
        db.session.commit()

        return jsonify({
            'message': f'Request {action}ed successfully',
            'event': event.to_dict(),
            'notification': notification.to_dict(),
            'thread_message': message.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error in handle_event_action: {str(e)}")
        return jsonify({'error': str(e)}), 500


#PUT/PATCH
@admin_routes.route('/events/<int:event_id>/status', methods=['PATCH'])
@login_required
def update_event_status(event_id):
    """
    Update the status of an event (admin-only).
    Supports optional message for notification.
    """
    try:
        if current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        event = Event.query.get_or_404(event_id)
        data = request.get_json()
        new_status = data.get('status')
        message = data.get('message', '')

        event.status = new_status

        # Only create notification if there's a client_id
        if event.client_id:
            notification = Notification(
                user_id=event.client_id,
                event_id=event_id,
                message=f'Your event "{event.title}" has been {new_status}' + (f': {message}' if message else ''),
                type=f'event_{new_status}'
            )
            db.session.add(notification)

        db.session.commit()
        return jsonify(event.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error updating event status: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/messages/<int:message_id>/status', methods=['PATCH'])
@login_required
def update_message_status(message_id):
    """Update message status (read/unread/archived)"""
    try:
        message = Message.query.get(message_id)
        if not message:
            return jsonify({'error': 'Message not found'}), 404

        data = request.get_json()
        new_status = data.get('status')

        if new_status not in ['unread', 'read', 'archived']:
            return jsonify({'error': 'Invalid status'}), 400

        message.status = new_status
        db.session.commit()

        return jsonify(message.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/messages/<int:message_id>', methods=['PUT'])
@login_required
def edit_message(message_id):
    """Edit a message"""
    try:
        message = Message.query.get(message_id)
        if not message:
            return jsonify({'error': 'Message not found'}), 404

        data = request.get_json()
        message.content = data.get('content', message.content)
        message.updated_at = datetime.utcnow()

        db.session.commit()
        return jsonify(message.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_routes.route('/events/<int:event_id>', methods=['PATCH'])
@login_required
def update_event_details(event_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        event = Event.query.get_or_404(event_id)
        data = request.json

        # Update event fields
        for key, value in data.items():
            if hasattr(event, key) and key != 'id':
                setattr(event, key, value)

        # Handle user notification if requested
        if data.get('notify_user'):
            notification = Notification(
                user_id=event.user_id,
                title="Event Update",
                content=f"Your event '{event.title}' has been updated by an admin.",
                type="event_update"
            )
            db.session.add(notification)

        db.session.commit()
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_routes.route('/notifications/<int:notification_id>/read', methods=['PATCH'])
@login_required
def mark_notification_read(notification_id):
    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        notification = Notification.query.get_or_404(notification_id)
        notification.read = True
        db.session.commit()
        return jsonify(notification.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#DELETE
@admin_routes.route('/events/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    """
    Delete an event (admin-only).
    """
    if current_user.role != 'admin':
        return {'error': 'Unauthorized'}, 403

    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'})

@admin_routes.route('/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    """Delete a message and its thread"""
    try:
        message = Message.query.get(message_id)
        if not message:
            return jsonify({'error': 'Message not found'}), 404

        # The cascade will handle deleting related messages
        db.session.delete(message)
        db.session.commit()

        return jsonify({'message': 'Message deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

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

    try:
        # Get all events
        events = Event.query.all()

        # Get messages where admin is either sender or recipient
        messages = Message.query.filter(
            (Message.recipient_id == current_user.id) |
            (Message.sender_id == current_user.id)
        ).order_by(Message.created_at.desc()).all()

        # Get notifications for admin
        notifications = Notification.query.filter_by(
            user_id=current_user.id,
            read=False
        ).order_by(Notification.created_at.desc()).all()

        return jsonify({
            'events': [event.to_dict() for event in events],
            'dashboard_data': {
                'messages': [message.to_dict() for message in messages],
                'notifications': [notif.to_dict() for notif in notifications]
            }
        }), 200

    except Exception as e:
        print(f"Error in admin_dashboard: {str(e)}")
        return jsonify({'error': str(e)}), 500
