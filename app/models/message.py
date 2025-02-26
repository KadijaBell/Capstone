from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=True)
    admin_reply = db.Column(db.Text)
    replied_at = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='unread')  # unread, read, archived
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=True)
    thread_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=True)
    is_admin_message = db.Column(db.Boolean, default=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)

    # Relationships
    sender = db.relationship(
        'User',
        foreign_keys=[sender_id],
        back_populates='sent_messages'
    )
    recipient = db.relationship(
        'User',
        foreign_keys=[recipient_id],
        back_populates='received_messages'
    )
    event = db.relationship('Event', back_populates='messages')
    replies = db.relationship(
        'Message',
        backref=db.backref('parent', remote_side=[id]),
        foreign_keys=[parent_id],
        cascade="all, delete-orphan"
    )
    thread_messages = db.relationship(
        'Message',
        backref=db.backref('thread_parent', remote_side=[id]),
        foreign_keys=[thread_id],
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'sender_id': self.sender_id,
            'sender_name': self.sender.username if self.sender else None,
            'user_email': self.sender.email if self.sender else None,
            'event_id': self.event_id,
            'admin_reply': self.admin_reply,
            'replied_at': self.replied_at.isoformat() if self.replied_at else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'parent_id': self.parent_id,
            'thread_id': self.thread_id,
            'is_admin_message': self.is_admin_message,
            'recipient_id': self.recipient_id,
            'recipient_name': self.recipient.username if self.recipient else None,
            'recipient_email': self.recipient.email if self.recipient else None,
            'event_title': self.event.title if self.event else None,
            'thread_messages': [msg.to_dict() for msg in self.thread_messages] if not self.thread_id else None,
            'replies': [reply.to_dict() for reply in self.replies] if self.replies else []
        }
