from app.models import db, Service, environment, SCHEMA
from sqlalchemy.sql import text


def seed_services():
    service1 = Service(
        name="Event Planning",
        description="Comprehensive event planning services for all occasions.",
        agency_id=1
    )
    service2 = Service(
        name="Marketing Strategy",
        description="Custom strategies to elevate your brand.",
        agency_id=2
    )
    service3 = Service(
        name="Social Media Management",
        description="Manage and grow your social media presence effectively.",
        agency_id=3
    )

    db.session.add(service1)
    db.session.add(service2)
    db.session.add(service3)
    db.session.commit()


def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))
    db.session.commit()
