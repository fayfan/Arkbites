import os
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .api.auth_routes import auth_routes
from .api.favorite_routes import favorite_routes
from .api.material_routes import material_routes
from .api.operator_routes import operator_routes
from .api.squad_routes import squad_routes
from .api.user_routes import user_routes
from .config import Config
from .models import db, User
from .seeds import seed_commands

app = Flask(__name__, static_folder="../react-vite/dist", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(favorite_routes, url_prefix="/api/favorites")
app.register_blueprint(material_routes, url_prefix="/api/materials")
app.register_blueprint(operator_routes, url_prefix="/api/operators")
app.register_blueprint(squad_routes, url_prefix="/api/squads")
app.register_blueprint(user_routes, url_prefix="/api/users")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask, we need to make sure that in production
# any request made over http is redirected to https
@app.before_request
def https_redirect():
    # Below line commented out while troubleshooting Render deploy (Mixed Content error)
    # if os.environ.get("FLASK_ENV") == "production":
    if request.headers.get("X-Forwarded-Proto") == "http":
        url = request.url.replace("http://", "https://", 1)
        code = 301
        return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our react builds in the production
    environment for favicon or index.html requests
    """
    if (
        path
        and path != "index.html"
        and os.path.exists(os.path.join(app.static_folder, path))
    ):
        return app.send_static_file(path)
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.errorhandler(405)
def internal_error(error):
    return jsonify({"error": str(error)}), 405


# @app.errorhandler(Exception)
# def handle_all_errors(error):
#     return jsonify({"error": str(error)}), 500
