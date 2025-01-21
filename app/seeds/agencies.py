from app.models import db, Agency, environment, SCHEMA
from sqlalchemy.sql import text


def seed_agencies():
    agency1 = Agency(
        name="Elite Event Planners",
        description="Specializing in high-end event planning for exclusive clients.",
        user_id=1
    )
    agency2 = Agency(
        name="Community Connections",
        description="Focused on community-driven events and collaborations.",
        user_id=2
    )
    agency3 = Agency(
        name="Insightful Analytics",
        description="Providing data-driven insights for event success.",
        user_id=3
    )

    db.session.add(agency1)
    db.session.add(agency2)
    db.session.add(agency3)
    db.session.commit()


def undo_agencies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.agencies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM agencies"))
    db.session.commit()
