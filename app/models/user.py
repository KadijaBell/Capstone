from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import enum

class UserRole(enum.Enum):
    ADMIN = 'admin'
    USER = 'user'

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production": __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.USER)

    agency = db.relationship("Agency", back_populates="user", uselist=False)
    events = db.relationship("Event", back_populates="client", cascade="all, delete-orphan")
    notifications = db.relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    replied_submissions = db.relationship(
        'ContactSubmission',
        foreign_keys='ContactSubmission.replied_by',
        backref='replier'
    )
    created_submissions = db.relationship(
        'ContactSubmission',
        foreign_keys='ContactSubmission.created_by',
        backref='creator'
    )
    sent_messages = db.relationship(
        'Message',
        foreign_keys='Message.sender_id',
        back_populates='sender',
        cascade="all, delete-orphan"
    )
    received_messages = db.relationship(
        'Message',
        foreign_keys='Message.recipient_id',
        back_populates='recipient'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role
        }
