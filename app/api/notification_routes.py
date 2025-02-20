from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from app.models import db, environment, SCHEMA, Notification, User
from datetime import datetime

notification_routes = Blueprint('notifications', __name__)

@notification_routes.route('/', methods=['GET'])
@login_required
def get_notifications():
    """Get all notifications for the current user"""
    try:
        if not current_user.is_authenticated:
            return jsonify({'error': 'User not authenticated'}), 401

        notifications = Notification.query.filter_by(user_id=current_user.id)\
            .order_by(Notification.created_at.desc())\
            .all()
        return jsonify({'notifications': [n.to_dict() for n in notifications]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notification_routes.route('/', methods=['POST'])
@login_required
def create_notification():
    """Create a new notification"""
    try:
        data = request.get_json()

        # Validate recipient exists
        recipient = User.query.get(data.get('user_id'))
        if not recipient:
            return jsonify({'error': 'Recipient not found'}), 404

        new_notification = Notification(
            user_id=data.get('user_id'),
            event_id=data.get('event_id'),
            message=data.get('message'),
            created_at=datetime.utcnow()
        )

        db.session.add(new_notification)
        db.session.commit()

        return jsonify(new_notification.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@notification_routes.route('/<int:id>/read', methods=['PATCH'])
@login_required
def mark_as_read(id):
    """Mark a notification as read"""
    try:
        notification = Notification.query.get(id)

        if not notification:
            return jsonify({'error': 'Notification not found'}), 404

        if notification.user_id != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403

        notification.read = True
        db.session.commit()

        return jsonify(notification.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@notification_routes.route('/unread-count', methods=['GET'])
@login_required
def get_unread_count():
    """Get count of unread notifications"""
    try:
        count = Notification.query.filter_by(
            user_id=current_user.id,
            read=False
        ).count()
        return jsonify({'count': count}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
