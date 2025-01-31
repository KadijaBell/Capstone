"""update event types and data

Revision ID: xxxx
Revises: previous_revision
Create Date: 2024-01-30 21:11:28

"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    # Create new enum type
    event_type = sa.Enum('portfolio', 'community', 'data', 'influencer', 'celebrity', 'other', name='event_type')

    # Create temporary column
    op.add_column('events', sa.Column('new_type', sa.String(50), nullable=True))

    # Update existing data
    op.execute("""
        UPDATE events
        SET new_type = CASE
            WHEN type = 'cause' THEN 'community'
            WHEN type = 'event' THEN 'community'
            ELSE 'other'
        END
    """)

    # Drop old type enum and column
    op.drop_column('events', 'type')

    # Create new enum type
    event_type.create(op.get_bind())

    # Add new column with enum type
    op.add_column('events', sa.Column('type', event_type, nullable=False, server_default='other'))

    # Copy data from temporary column
    op.execute("""
        UPDATE events
        SET type = new_type::event_type
    """)

    # Drop temporary column
    op.drop_column('events', 'new_type')

def downgrade():
    # Create old enum type
    old_type = sa.Enum('event', 'cause', name='event_type')

    # Create temporary column
    op.add_column('events', sa.Column('old_type', sa.String(50), nullable=True))

    # Update data back
    op.execute("""
        UPDATE events
        SET old_type = CASE
            WHEN type IN ('community', 'portfolio') THEN 'event'
            ELSE 'cause'
        END
    """)

    # Drop new type column
    op.drop_column('events', 'type')

    # Create old enum type
    old_type.create(op.get_bind())

    # Add old column back
    op.add_column('events', sa.Column('type', old_type, nullable=False, server_default='event'))

    # Copy data from temporary column
    op.execute("""
        UPDATE events
        SET type = old_type::event_type
    """)

    # Drop temporary column
    op.drop_column('events', 'old_type')
