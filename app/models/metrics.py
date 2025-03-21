from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Metric(db.Model):
    __tablename__ = 'metrics'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    metric_name = db.Column(db.String, nullable=False)
    agency_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('agency.id')))
    value = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=func.now())

    agency = db.relationship("Agency", back_populates="metrics")

    def to_dict(self):
        return {
            'id': self.id,
            'metric_name': self.metric_name,
            'agency_id': self.agency_id,
            'value': self.value,
            'created_at': self.created_at
        }
