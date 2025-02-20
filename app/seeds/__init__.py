from flask.cli import AppGroup
from .users import seed_users, undo_users
from .agencies import seed_agencies, undo_agencies
from .events import seed_events, undo_events
from .services import seed_services, undo_services
from .metrics import seed_metrics, undo_metrics


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_metrics()
        undo_events()
        undo_services()
        undo_agencies()
        undo_users()

    # Seed in order of dependencies
    seed_users()
    seed_agencies()  # Depends on users
    seed_services()  # Depends on agencies
    seed_events()    # Depends on agencies, services, and users
    seed_metrics()   # Depends on agencies



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_users()
        undo_events()
        undo_services()
        undo_metrics()
        undo_agencies()
