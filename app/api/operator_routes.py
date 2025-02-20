from flask import Blueprint
from flask_login import login_required
from app.models import Operator, UserOperator

operator_routes = Blueprint("operators", __name__)


@operator_routes.route("/")
def operators():
    """
    Queries for all operators & returns them in a list of operator dictionaries
    """
    operators = Operator.query.all()
    return [operator.to_dict() for operator in operators]


@operator_routes.route("/<display_number>")
def operator(display_number):
    """
    Queries for an operator by display_number & returns it in a dictionary
    """
    operator = Operator.query.get(display_number)
    if operator:
        return operator.to_dict()
    else:
        return {"message": "Operator not found"}, 404


@operator_routes.route("/current")
@login_required
def user_operators():
    """
    Queries for all of a user's operators & returns them in a list of operator dictionaries
    """
    user_operators = UserOperator.query.all()
    return [user_operator.to_dict() for user_operator in user_operators]


@operator_routes.route("/current/<int:operator_id>")
@login_required
def user_operator(operator_id):
    """
    Queries for a user's operator by operator_id & returns it in a dictionary
    """
    user_operator = UserOperator.query.get(operator_id)
    if user_operator:
        return user_operator.to_dict()
    else:
        return {"message": "User operator not found"}, 404
