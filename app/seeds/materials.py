from sqlalchemy.sql import text
from app.models import db, environment, Material, SCHEMA
import json


def seed_materials():
    with open("item_table.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        items = data["items"]
        # exp_items = data["expItems"]

        for item in items.values():
            if item["iconId"].startswith("MTL_SL"):
                material = Material(
                    name=item["name"], rarity=item["rarity"], icon_id=item["iconId"]
                )
                db.session.add(material)

    db.session.commit()


def undo_materials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.materials RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM materials"))

    db.session.commit()
