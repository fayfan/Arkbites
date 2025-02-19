from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, Squad


def seed_squads():
    squad_1 = Squad(
        name="Annihilation",
        user_id=2,
    )
    squad_2 = Squad(
        name="Rhodes Island",
        user_id=3,
    )

    db.session.add(squad_1)
    db.session.add(squad_2)
    db.session.commit()


def undo_squads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.squads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM squads"))

    db.session.commit()
