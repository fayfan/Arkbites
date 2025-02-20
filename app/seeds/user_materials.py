from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, UserMaterial


def seed_user_materials():
    user_material_1 = UserMaterial(user_id=2, material_id=3)
    user_material_2 = UserMaterial(user_id=2, material_id=6)
    user_material_3 = UserMaterial(user_id=2, material_id=9)
    user_material_4 = UserMaterial(user_id=2, material_id=12)
    user_material_5 = UserMaterial(user_id=2, material_id=15)
    user_material_6 = UserMaterial(user_id=3, material_id=1)
    user_material_7 = UserMaterial(user_id=3, material_id=4)
    user_material_8 = UserMaterial(user_id=3, material_id=7)

    db.session.add(user_material_1)
    db.session.add(user_material_2)
    db.session.add(user_material_3)
    db.session.add(user_material_4)
    db.session.add(user_material_5)
    db.session.add(user_material_6)
    db.session.add(user_material_7)
    db.session.add(user_material_8)
    db.session.commit()


def undo_user_materials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_materials RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_materials"))

    db.session.commit()
