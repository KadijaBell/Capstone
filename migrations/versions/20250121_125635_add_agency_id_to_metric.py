"""Add agency_id to Metric

Revision ID: 4597d83975f1
Revises: b93d734cdf55
Create Date: 2025-01-21 12:56:35.631218

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4597d83975f1'
down_revision = 'b93d734cdf55'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('metrics', schema=None) as batch_op:
        batch_op.add_column(sa.Column('agency_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_metrics_agency_id', 'agency', ['agency_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('metrics', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('agency_id')

    # ### end Alembic commands ###
