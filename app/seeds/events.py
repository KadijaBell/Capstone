from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text


def seed_events():
    event1 = Event(
        title="Networking Meetup",
        description="A casual networking event for professionals.",
        type="event",
        status="active",
        client_id=2,
        service_id=1,
        agency_id=1
    )
    event2 = Event(
        title="Charity Gala",
        description="A formal charity event to raise funds for local causes.",
        type="event",
        status="pending",
        client_id=3,
        service_id=2,
        agency_id=2
    )
    event3 = Event(
        title="Environmental Awareness Campaign",
        description="A campaign to promote sustainable practices.",
        type="cause",
        status="active",
        client_id=4,
        service_id=3,
        agency_id=3
    )
    event4 = Event(
        title=" Awareness Campaign",
        description="A campaign to promote  practices.",
        type="cause",
        status="resolved",
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
