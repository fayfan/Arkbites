from app.models import db, environment, SCHEMA, user_operators
from sqlalchemy.sql import text


def seed_user_operators():
    db.session.execute(user_operators.insert().values(user_id=3, operator_id="R001"))
    db.session.commit()


def undo_user_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_operators"))

    db.session.commit()
