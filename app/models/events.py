from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import Enum
status_enum = Enum('active', 'inactive', 'pending', 'close', 'approved', 'denied', name='event_status')

# class EventStatus(enum.Enum):
#     ACTIVE = 'active'
#     INACTIVE = 'inactive'
#     PENDING = 'pending'
#     CLOSE = 'close'
# APPROVED = 'approved'

class Event(db.Model):
    __tablename__ = 'events'
    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    organization = db.Column(db.String(255))
    location = db.Column(db.String(255))
    date = db.Column(db.DateTime)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(status_enum,nullable=False)
    agency_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('agency.id')))
    client_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable=True)
    service_type = db.Column(db.String(50), nullable=True)
    event_type = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    denial_reason = db.Column(db.Text)
    edit_requested = db.Column(db.Boolean, default=False)
    edit_message = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    agency = db.relationship("Agency", back_populates="events")
    service = db.relationship("Service", back_populates="events")
    client = db.relationship(
        "User",
        back_populates="events",
        foreign_keys=[client_id]
    )
    notifications = db.relationship("Notification", back_populates="event", cascade="all, delete-orphan")
    contact_submissions = db.relationship('ContactSubmission', back_populates='event', cascade='all, delete-orphan')
    messages = db.relationship('Message', back_populates='event', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'status': self.status,
            'organization': self.organization,
            'location': self.location,
            'date': self.date,
            'client_id': self.client_id,
            'agency_id': self.agency_id,
            'service_id': self.service_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'service_type': self.service_type,
            'event_type': self.event_type,
            'denial_reason': self.denial_reason,
            'edit_requested': self.edit_requested,
            'edit_message': self.edit_message,
            'user_id': self.user_id or self.client_id,
            'messages': [message.to_dict() for message in self.messages]
        }
