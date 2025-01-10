from flask import Flask

def create_app():
    app = Flask(__name__)

    # Configuration setup (e.g., from a config.py file)
    app.config.from_pyfile('../config.py')  # Optional, if you have configuration settings

    # Register Blueprints
    from .routes import main_routes
    app.register_blueprint(main_routes)

    # Additional setup (e.g., database, extensions, etc.)
    # from .models import db
    # db.init_app(app)

    return app
