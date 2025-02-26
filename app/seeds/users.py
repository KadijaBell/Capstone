from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.user import UserRole



# Adds a demo user, you can add other users here if you want
def seed_users():
    admin = User(
        username='AdminUser',
        email='admin@capstone.com',
        password='secureadminpassword',
        role=UserRole.ADMIN
    )
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        role=UserRole.USER
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        role=UserRole.USER
    )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        role = UserRole.USER
    )

    db.session.add(admin)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
