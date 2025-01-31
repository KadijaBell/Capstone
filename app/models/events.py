from .db import db, environment, SCHEMA
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'
    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    organization = db.Column(db.String(255))
    location = db.Column(db.String(255))
    date = db.Column(db.DateTime)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum(
        'event',
        'portfolio',
        'community',
        'data',
        'influencer',
        'celebrity', name='event_type'), nullable=False)
    status = db.Column(db.Enum('active', 'inactive', 'pending','close','approved',name='event_status'), nullable=False)
    agency_id = db.Column(db.Integer, db.ForeignKey('agency.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)




    agency = db.relationship("Agency", back_populates="events")
    service = db.relationship("Service", back_populates="events")
    client = db.relationship("User", back_populates="events")

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
        }
