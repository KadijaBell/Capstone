from app.models import db, Metric, environment, SCHEMA
from sqlalchemy.sql import text

def seed_metrics():
    metric1 = Metric(
        metric_name="Total Events",
        value=150.0,
        agency_id=3,

    )
    metric2 = Metric(
        metric_name="Active Clients",
        value=45.0,
        agency_id=2,

    )
    metric3 = Metric(
        metric_name="Successful Campaigns",
        value=120.0,
        agency_id=1,


    )

    db.session.add(metric1)
    db.session.add(metric2)
    db.session.add(metric3)
    db.session.commit()


def undo_metrics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.metrics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM metrics"))
    db.session.commit()
