from app.models import db, Event, environment, SCHEMA, EventStatus
from sqlalchemy.sql import text
from datetime import datetime




def seed_events():
    event1 = Event(
        title="Networking Meetup",
        organization=None,
        location=None,
        date=None,
        description="A casual networking event for professionals.",
        type="community",
        status=EventStatus.ACTIVE,
        agency_id=1,
        client_id=2,
        service_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()

    )

    event2 = Event(
        title="Charity Gala",
        organization=None,
        location=None,
        date=None,
        description="A formal charity event to raise funds for local causes.",
        type="community",
        status=EventStatus.PENDING,
        agency_id=2,
        client_id=3,
        service_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()

    )

    event3 = Event(
        title="Environmental Awareness Campaign",
        organization=None,
        location=None,
        date=None,
        description="A campaign to promote sustainable practices.",
        type="data",
        status=EventStatus.APPROVED,
        agency_id=3,
        client_id=4,
        service_id=3,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()

    )

    event4 = Event(
        title=" Awareness Campaign",
        organization=None,
        location=None,
        date=None,
        description="A campaign to promote  practices.",
        type="influencer",
        status=EventStatus.APPROVED,
        agency_id=3,
        client_id=4,
        service_id=3,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    event4 = Event(
        title=" Awareness Campaign",
        description="A campaign to promote  practices.",
        type="cause",
        status=EventStatus.RESOLVED,
        client_id=4,
        service_id=3,
        agency_id=3
    )

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))
    db.session.commit()
