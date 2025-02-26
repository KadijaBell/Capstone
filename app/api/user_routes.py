from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, ContactSubmission, Notification, Message
from app import db
from datetime import datetime

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

#GET

@user_routes.route('/notifications', methods=['GET'])
@login_required
def get_notifications():
    try:
        notifications = Notification.query.filter_by(
            user_id=current_user.id
        ).order_by(Notification.created_at.desc()).all()

        return jsonify({
            'notifications': [notif.to_dict() for notif in notifications]
        }), 200

    except Exception as e:
        print("Error fetching notifications:", str(e))
        return jsonify({'error': str(e)}), 500

@user_routes.route('/messages', methods=['GET'])
@login_required
def get_user_messages():
    try:
        messages = ContactSubmission.query.filter_by(
            created_by=current_user.id
        ).order_by(ContactSubmission.created_at.desc()).all()

        return jsonify({
            'messages': [message.to_dict() for message in messages]
        }), 200

    except Exception as e:
        print("Error fetching messages:", str(e))
        return jsonify({'error': str(e)}), 500

@user_routes.route('/messages/<int:message_id>/thread', methods=['GET'])
@login_required
def get_message_thread(message_id):
    try:
        messages = Message.query.filter(
            (Message.id == message_id) |
            (Message.parent_id == message_id)
        ).order_by(Message.created_at).all()

        return jsonify({
            'messages': [message.to_dict() for message in messages]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_routes.route('/:id/events', methods=['GET'])
@login_required
def get_user_events(id):
    user = User.query.get(id)
    return {'events': [event.to_dict() for event in user.events]}



#POST

@user_routes.route('/contact-admin', methods=['POST'])
@login_required
def contact_admin():
    try:
        data = request.get_json()

        new_submission = ContactSubmission(
            name=current_user.username,
            email=current_user.email,
            subject="User Contact Form",
            message=data.get('message'),
            status='pending',
            created_by=current_user.id,
            created_at=datetime.utcnow()
        )

        # Create notification for admin
        admin_notification = Notification(
            user_id=1,  # Assuming admin has ID 1
            message=f"New message from {current_user.username}",
            created_at=datetime.utcnow()
        )

        db.session.add(new_submission)
        db.session.add(admin_notification)
        db.session.commit()

        return new_submission.to_dict(), 201

    except Exception as e:
        print("Contact Admin Error:", str(e))
        db.session.rollback()
        return {'error': str(e)}, 500


@user_routes.route('/messages/<int:message_id>/reply', methods=['POST'])
@login_required
def reply_to_message(message_id):
    try:
        data = request.get_json()
        content = data.get('content')

        if not content:
            return jsonify({'error': 'Content is required'}), 400

        # Get the original message
        original_message = Message.query.get(message_id)
        if not original_message:
            return jsonify({'error': 'Message not found'}), 404

        # Create new reply message
        new_reply = Message(
            content=content,
            sender_id=current_user.id,
            recipient_id=original_message.sender_id,  # Reply to the original sender
            thread_id=original_message.thread_id or original_message.id,  # Use existing thread_id or original message id
            status='unread'
        )

        db.session.add(new_reply)
        db.session.commit()

        return jsonify(new_reply.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#PUT/PATCH

@user_routes.route('/notifications/<int:notification_id>', methods=['PUT'])
@login_required
def update_notification(notification_id):
    try:
        notification = Notification.query.get_or_404(notification_id)

        if notification.user_id != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()
        notification.read = data.get('read', notification.read)

        db.session.commit()
        return jsonify(notification.to_dict()), 200

    except Exception as e:
        print("Error updating notification:", str(e))
        return jsonify({'error': str(e)}), 500

@user_routes.route('/messages/<int:message_id>', methods=['PUT'])
@login_required
def update_message(message_id):
    try:
        message = ContactSubmission.query.get_or_404(message_id)

        if message.created_by != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()
        message.read = data.get('read', message.read)
        message.urgent = data.get('urgent', message.urgent)

        db.session.commit()
        return jsonify(message.to_dict()), 200

    except Exception as e:
        print("Error updating message:", str(e))
        return jsonify({'error': str(e)}), 500



#DELETE

@user_routes.route('/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    try:
        message = ContactSubmission.query.get_or_404(message_id)

        # Check if the user owns this message
        if message.created_by != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403

        db.session.delete(message)
        db.session.commit()

        return jsonify({'message': 'Message deleted successfully'}), 200

    except Exception as e:
        print("Error deleting message:", str(e))
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
