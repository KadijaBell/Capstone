"""update event types

Revision ID: xxxx
Revises: previous_revision
Create Date: 2024-01-30 21:18:53

"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    # Drop the existing enum type
    with op.batch_alter_table('events') as batch_op:
        batch_op.drop_column('type')

    op.execute('DROP TYPE IF EXISTS event_type')

    # Create new enum type and column
    event_type = sa.Enum('portfolio', 'community', 'data', 'influencer', 'celebrity', 'other', name='event_type')
    event_type.create(op.get_bind())

    # Add the column back with the new enum type
    with op.batch_alter_table('events') as batch_op:
        batch_op.add_column(sa.Column('type', event_type, nullable=False, server_default='other'))

def downgrade():
    # Drop the new column and enum type
    with op.batch_alter_table('events') as batch_op:
        batch_op.drop_column('type')

    op.execute('DROP TYPE IF EXISTS event_type')

    # Recreate the old enum type and column
    old_type = sa.Enum('event', 'cause', name='event_type')
    old_type.create(op.get_bind())

    with op.batch_alter_table('events') as batch_op:
        batch_op.add_column(sa.Column('type', old_type, nullable=False, server_default='event'))
