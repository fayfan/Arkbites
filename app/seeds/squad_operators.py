from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, squad_operators


def seed_squad_operators():
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=1))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=2))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=3))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=4))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=5))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=6))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=7))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=8))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=9))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=10))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=11))
    db.session.execute(squad_operators.insert().values(squad_id=1, operator_id=12))

    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=15))
    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=16))
    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=17))
    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=18))
    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=19))
    db.session.execute(squad_operators.insert().values(squad_id=2, operator_id=20))

    db.session.commit()


def undo_squad_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.squad_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM squad_operators"))

    db.session.commit()
