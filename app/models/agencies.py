from .db import db
from datetime import datetime

class Agency(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="agency", uselist=False)
    events = db.relationship(
        "Event", back_populates="agency", cascade="all, delete-orphan"
    )
    services = db.relationship(
        "Service", back_populates="agency", cascade="all, delete-orphan"
    )
    metrics = db.relationship(
        "Metric", back_populates="agency", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
