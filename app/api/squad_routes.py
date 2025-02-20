from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Squad

squad_routes = Blueprint("squads", __name__)


@squad_routes.route("/current")
@login_required
def squads():
    """
    Queries for all of a user's squads & returns them in a list of squad dictionaries
    """
    user_id = current_user.id
    squads = Squad.query.filter(Squad.user_id == user_id).all()
    return {"squads": [squad.to_dict() for squad in squads]}


@squad_routes.route("/current/<int:id>")
@login_required
def squad(id):
    """
    Queries for a user's squad by id & returns that squad in a dictionary
    """
    user_id = current_user.id
    squad = Squad.query.filter(Squad.user_id == user_id, Squad.id == id).first()
    if squad:
        return squad.to_dict()
    else:
        return {"message": "Squad not found"}, 404
