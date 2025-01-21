from .db import db, environment, SCHEMA
from datetime import datetime

class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    agency_id = db.Column(db.Integer, db.ForeignKey('agency.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    agency = db.relationship("Agency", back_populates="services")
    events = db.relationship("Event", back_populates="service")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'agency_id': self.agency_id,
            'created_at': self.created_at
        }
