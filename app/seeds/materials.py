from sqlalchemy.sql import text
from app.models import db, environment, Material, SCHEMA
import json


def seed_materials():
    with open("arknights_item_images.json", "r", encoding="utf-8") as file:
        images = json.load(file)

    with open("arknights_item_table.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        materials = data["items"]
        # exp_items = data["expItems"]

        for material in materials.values():
            if material["iconId"].startswith("MTL_SL"):
                new_material = Material(
                    name=material["name"],
                    rarity=material["rarity"],
                    icon_id=material["iconId"],
                    icon_url=images[material["name"]]["icon_url"],
                )
                db.session.add(new_material)

    db.session.commit()


def undo_materials():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.materials RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM materials"))

    db.session.commit()
