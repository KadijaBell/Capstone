from .db import db, environment, SCHEMA
from datetime import datetime

class ContactSubmission(db.Model):
    __tablename__ = 'contact_submissions'
    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pending')
    admin_reply = db.Column(db.Text)
    replied_at = db.Column(db.DateTime)
    replied_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    
    event = db.relationship('Event', back_populates='contact_submissions')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'status': self.status,
            'admin_reply': self.admin_reply,
            'replied_at': self.replied_at,
            'replied_by': self.replied_by,
            'created_at': self.created_at,
            'created_by': self.created_by,
            'event_id': self.event_id
        }
