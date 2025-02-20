from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    identity = form.user.data
    user = User.query.filter((User.email == identity) | (User.username == identity)).first()
    if not user:
        raise ValidationError('Account information provided not found., please sign up')


def password_matches(form, field):
    # Checking if password matches
    identity = form.user.data
    password = field.data
    user = User.query.filter((User.email == identity) | (User.username == identity)).first()
    if not user or not user.check_password(password):
        raise ValidationError('Invalid credentials. Please try again.')


class LoginForm(FlaskForm):
    user = StringField(
        'Email or Username',
        validators=[
            DataRequired(),
            user_exists
        ]
    )
    password = StringField(
        'password',
        validators=[DataRequired(), password_matches]
    )
