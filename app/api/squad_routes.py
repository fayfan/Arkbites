from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Squad, UserOperator
from app.forms import SquadForm

squad_routes = Blueprint("squads", __name__)


@squad_routes.route("/", methods=["POST"])
@login_required
def create_squad():
    """
    Creates a new squad
    """
    form = SquadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_squad = Squad(
            user_id=current_user.id,
            name=form.name.data,
        )

        db.session.add(new_squad)
        db.session.commit()
        return new_squad.to_dict()

    return form.errors, 400


@squad_routes.route("/current")
@login_required
def get_user_squads():
    """
    Queries for all of a user's squads & returns them in a list of dictionaries
    """
    user_id = current_user.id
    squads = Squad.query.filter(Squad.user_id == user_id).all()
    return [squad.to_dict() for squad in squads]


@squad_routes.route("/<int:squad_id>")
@login_required
def get_user_squad(squad_id):
    """
    Queries for a user's squad by id & returns that squad in a dictionary
    """
    user_id = current_user.id
    squad = Squad.query.filter(Squad.user_id == user_id, Squad.id == squad_id).first()

    if not squad:
        return {"message": "Squad not found"}, 404

    return squad.to_dict()


@squad_routes.route("/<int:squad_id>", methods=["PUT"])
@login_required
def edit_squad(squad_id):
    """
    Queries for a user's squad by id & edits it
    """
    form = SquadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.id
    edited_squad = Squad.query.filter(
        Squad.user_id == user_id, Squad.id == squad_id
    ).first()

    if not edited_squad:
        return {"message": "Squad not found"}, 404
    elif form.validate_on_submit():
        form.populate_obj(edited_squad)
        db.session.commit()
        return edited_squad.to_dict()

    return form.errors, 400


@squad_routes.route("/<int:squad_id>", methods=["DELETE"])
@login_required
def delete_squad(squad_id):
    """
    Queries for a user's squad by id & deletes it
    """
    user_id = current_user.id
    deleted_squad = Squad.query.filter(
        Squad.user_id == user_id, Squad.id == squad_id
    ).first()

    if not deleted_squad:
        return {"message": "Squad not found"}, 404

    db.session.delete(deleted_squad)
    db.session.commit()
    return {"message": "Successfully deleted"}


@squad_routes.route(
    "/<int:squad_id>/operators/<int:user_operator_id>", methods=["POST"]
)
def add_operator_to_squad(squad_id, user_operator_id):
    """
    Queries for a user's squad by its id & adds the user's operator by its id
    """
    user_id = current_user.id
    squad = Squad.query.filter(Squad.user_id == user_id, Squad.id == squad_id).first()
    print(squad.operators)

    if not squad:
        return {"message": "Squad not found"}, 404

    user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.id == user_operator_id
    ).first()

    if not user_operator:
        return {"message": "User operator not found"}, 404
    elif user_operator in squad.operators:
        return {"message": "User operator already in squad"}, 409

    squad.operators.append(user_operator)
    db.session.commit()
    return squad.to_dict()


@squad_routes.route(
    "/<int:squad_id>/operators/<int:user_operator_id>", methods=["DELETE"]
)
def remove_operator_from_squad(squad_id, user_operator_id):
    """
    Queries for a user's squad by its id & removes the user's operator by its id
    """
    user_id = current_user.id
    squad = Squad.query.filter(Squad.user_id == user_id, Squad.id == squad_id).first()

    if not squad:
        return {"message": "Squad not found"}, 404

    user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.id == user_operator_id
    ).first()

    if not user_operator:
        return {"message": "User operator not found"}, 404
    elif user_operator not in squad.operators:
        return {"message": "User operator not in squad"}, 422

    squad.operators.remove(user_operator)
    db.session.commit()
    return squad.to_dict()
