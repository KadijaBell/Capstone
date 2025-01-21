from .db import db
from datetime import datetime

class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    metric_name = db.Column(db.String, nullable=False)
    value = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    agency = db.relationship("Agency", back_populates="metrics")
