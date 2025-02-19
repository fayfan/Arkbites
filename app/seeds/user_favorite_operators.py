from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, user_favorite_operators


def seed_user_favorite_operators():
    db.session.execute(
        user_favorite_operators.insert().values(user_id=3, operator_id=1)
    )
    db.session.commit()


def undo_user_favorite_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_favorite_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_favorite_operators"))

    db.session.commit()
