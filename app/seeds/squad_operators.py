from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, squad_operators


def seed_squad_operators():
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=1))
    db.session.commit()


def undo_squad_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.squad_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM squad_operators"))

    db.session.commit()
