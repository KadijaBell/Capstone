from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum('event', 'cause', name='event_type'), nullable=False)
    status = db.Column(db.Enum('active', 'inactive', name='event_status'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    agency = db.relationship("Agency", back_populates="events")
    services = db.relationship(
        "Service", back_populates="event", cascade="all, delete-orphan"
    )
