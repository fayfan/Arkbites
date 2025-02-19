from sqlalchemy.sql import text
from app.models import db, Operator, environment, SCHEMA


def seed_operators():
    amiya = Operator(
        display_number="R001",
        name="Amiya",
        position="RANGED",
        tag_list="DPS",
        item_obtain_approach="Main Story",
        rarity="TIER_5",
        profession="CASTER",
        sub_profession_id="corecaster",
    )

    db.session.add(amiya)
    db.session.commit()


def undo_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM operators"))

    db.session.commit()
