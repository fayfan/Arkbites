from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Operator, UserOperator
from app.forms import OperatorForm

operator_routes = Blueprint("operators", __name__)


@operator_routes.route("/")
def get_operators():
    """
    Queries for all operators & returns them in a list of dictionaries
    """
    operators = Operator.query.all()
    return {operator.display_number: operator.to_dict() for operator in operators}


@operator_routes.route("/<display_number>")
def get_operator(display_number):
    """
    Queries for an operator by display number & returns it in a dictionary
    """
    operator = Operator.query.get(display_number)

    if not operator:
        return {"message": "Operator not found"}, 404

    return operator.to_dict()


@operator_routes.route("/<display_number>", methods=["POST"])
@login_required
def add_user_operator(display_number):
    """
    Queries for an operator by id & adds it to the user's account
    """
    form = OperatorForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_user_operator = UserOperator(
            user_id=current_user.id,
            display_number=display_number,
            phase=form.phase.data,
            level=form.level.data,
        )

        db.session.add(new_user_operator)
        db.session.commit()
        return {new_user_operator.display_number: new_user_operator.to_dict()}

    return form.errors, 400


@operator_routes.route("/current")
@login_required
def get_user_operators():
    """
    Queries for all of a user's operators & returns them in a list of dictionaries
    """
    user_id = current_user.id
    user_operators = UserOperator.query.filter(UserOperator.user_id == user_id).all()
    return {
        user_operator.display_number: user_operator.to_dict()
        for user_operator in user_operators
    }


@operator_routes.route("/current/<display_number>")
@login_required
def get_user_operator(display_number):
    """
    Queries for a user's operator by display number & returns it in a dictionary
    """
    user_id = current_user.id
    user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.display_number == display_number
    ).first()

    if not user_operator:
        return {"message": "User operator not found"}, 404

    return user_operator.to_dict()


@operator_routes.route("/current/<display_number>", methods=["PUT"])
@login_required
def edit_user_operator(display_number):
    """
    Queries for a user's operator by display number & edits it
    """
    form = OperatorForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.id
    edited_user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.display_number == display_number
    ).first()

    if not edited_user_operator:
        return {"message": "User operator not found"}, 404
    elif form.validate_on_submit():
        form.populate_obj(edited_user_operator)
        db.session.commit()
        return {edited_user_operator.display_number: edited_user_operator.to_dict()}

    return form.errors, 400


@operator_routes.route("/current/<display_number>", methods=["DELETE"])
@login_required
def delete_user_operator(display_number):
    """
    Queries for a user's operator by display number & deletes it
    """
    user_id = current_user.id
    deleted_user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.display_number == display_number
    ).first()

    if not deleted_user_operator:
        return {"message": "User operator not found"}, 404

    db.session.delete(deleted_user_operator)
    db.session.commit()
    return {"message": "Successfully deleted"}
