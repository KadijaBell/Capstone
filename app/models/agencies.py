from .db import db, environment, SCHEMA
from datetime import datetime

class Agency(db.Model):
    __tablename__ = 'agency'
    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)


    user = db.relationship("User", back_populates="agency", uselist=False)
    events = db.relationship("Event", back_populates="agency", cascade="all, delete-orphan")
    services = db.relationship("Service", back_populates="agency", cascade="all, delete-orphan")
    metrics = db.relationship("Metric", back_populates="agency", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
            'user_id': self.user_id
        }
