from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Notification(db.Model):
    __tablename__ = 'notifications'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=True)
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())
    type = db.Column(db.String(255), nullable=True)
    # Relationships
    user = db.relationship("User", back_populates="notifications")
    event = db.relationship("Event", back_populates="notifications")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'message': self.message,
            'read': self.read,
            'created_at': self.created_at,
            'type': self.type
        }
