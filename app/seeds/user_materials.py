from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, user_materials


def seed_user_materials():
    db.session.execute(user_materials.insert().values(user_id=3, material_id="1"))
    db.session.commit()


def undo_user_materials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_materials RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_materials"))

    db.session.commit()
