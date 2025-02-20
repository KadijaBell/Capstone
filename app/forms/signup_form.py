from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data.lower()
    user = User.query.filter(User.email.ilike(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data.lower()
    user = User.query.filter(User.username.ilike(username)).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username',
        validators=[DataRequired(),
        Length(min=3, max=20, message="Username must be between 3 and 20 characters"),
        username_exists
        ])
    email = StringField(
        'email',
        validators=[DataRequired(),
        Email(message="Please provide a valid email."),
        user_exists])

    password = StringField(
        'password',
        validators=[DataRequired(),
        Length(min=8, message="Password must be at least 8 characters long."),
        Regexp(r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$',
        message="Password must contain at least one uppercase letter, one number, and one special character."
        )])
