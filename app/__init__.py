import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from .api.admin_routes import admin_routes
from .api.service_routes import service_routes
from .api.metric_routes import metric_routes
from .api.agency_routes import agency_routes
from .api.notification_routes import notification_routes
from .seeds import seed_commands
from .config import Config

def create_app():
    app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

    # Session configuration
    app.config['SECRET_KEY'] = 'your-secret-key'  # Make sure this is set
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    # CORS configuration
    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],  # Your frontend URL
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"],
            "credentials": True
        }
    })

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Tell flask about our seed commands
    app.cli.add_command(seed_commands)

    app.config.from_object(Config)
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(event_routes, url_prefix='/api/events')
    app.register_blueprint(admin_routes, url_prefix='/api/admin')
    app.register_blueprint(service_routes, url_prefix='/api/services')
    app.register_blueprint(metric_routes, url_prefix='/api/metrics')
    app.register_blueprint(agency_routes, url_prefix='/api/agencies')
    app.register_blueprint(notification_routes, url_prefix='/api/notifications')
    db.init_app(app)
    Migrate(app, db)

    # Since we are deploying with Docker and Flask,
    # we won't be using a buildpack when we deploy to Heroku.
    # Therefore, we need to make sure that in production any
    # request made over http is redirected to https.
    # Well.........
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)

    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=True if os.environ.get("FLASK_ENV") == "production" else False,
            samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
            httponly=True
        )
        return response

    @app.route("/api/docs")
    def api_help():
        """
        Returns all API routes and their doc strings
        """
        acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                        app.view_functions[rule.endpoint].__doc__ ]
                        for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
        return route_list

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        """
        This route will direct to the public directory in our
        react builds in the production environment for favicon
        or index.html requests
        """
        if path == 'favicon.ico':
            return app.send_from_directory('public', 'favicon.ico')
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    # TODO: Notification feature temporarily removed. To re-implement:
    # 1. Re-enable NotificationProvider in Layout.jsx
    # 2. Re-add NotificationBell to Navigation.jsx and AdminDashboard.jsx
    # 3. Resolve CORS issues with proper configuration
    # 4. Test notification functionality

    return app
