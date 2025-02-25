import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# SQLAlchemy 1.4 no longer supports
    # url strings that start with 'postgres'
    # # (only 'postgresql') but heroku's
    # postgres add-on automatically sets the
    # # url in the hidden config vars to
    # start with postgres.
    # # so the connection uri must be
    # updated here (for production)
    # SQLALCHEMY_DATABASE_URI = os.environ.
    # get(
    #     'DATABASE_URL').replace
    #     ('postgres://', 'postgresql://')
    
    # Get the environment
    ENVIRONMENT = os.environ.get("FLASK_ENV", "development")

    # Set the database URL based on environment
    if ENVIRONMENT == "production":
        # Handle production database URL
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://')
    else:
        # Use SQLite for development
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')

    SQLALCHEMY_ECHO = True
