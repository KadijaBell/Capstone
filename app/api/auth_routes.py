from flask import Blueprint, request,jsonify
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        identity = form.user.data
        user = User.query.filter((User.email == identity) | (User.username == identity)).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    try:
        if form.validate_on_submit():
            role = form.data.get('role', 'user')
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                role=role
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        return form.errors, 401
    except Exception as error:
        return {'error': str(error)}, 500



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/current-user', methods=['GET'])
@login_required
def current_user_details():
    """
    Returns the details of the currently logged-in user.
    """
    return jsonify(current_user.to_dict())
