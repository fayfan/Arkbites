from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, UserOperator


def seed_user_operators():
    operator_1 = UserOperator(user_id=3, operator_id="R001")

    db.session.add(operator_1)
    db.session.commit()


def undo_user_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_operators"))

    db.session.commit()
