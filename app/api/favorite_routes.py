from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, user_favorite_operators, UserOperator

favorite_routes = Blueprint("favorites", __name__)


@favorite_routes.route("/<display_number>", methods=["POST"])
@login_required
def favorite_operator(display_number):
    """
    Favorites an operator by display number
    """
    user_id = current_user.id
    user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.display_number == display_number
    ).first()

    if not user_operator:
        return {"message": "User operator not found"}, 404

    favorited_operator = user_favorite_operators.insert().values(
        user_id=user_id, operator_id=user_operator.id
    )
    db.session.execute(favorited_operator)
    db.session.commit()
    return {"message": "Favorited user operator"}


@favorite_routes.route("/<display_number>", methods=["DELETE"])
@login_required
def unfavorite_operator(display_number):
    """
    Unfavorites an operator by display number
    """
    user_id = current_user.id
    user_operator = UserOperator.query.filter(
        UserOperator.user_id == user_id, UserOperator.display_number == display_number
    ).first()

    if not user_operator:
        return {"message": "User operator not found"}, 404

    db.session.execute(
        user_favorite_operators.delete().where(
            (user_favorite_operators.c.user_id == user_id)
            & (user_favorite_operators.c.operator_id == user_operator.id)
        )
    )
    db.session.commit()
    return {"message": "Unfavorited user operator"}
