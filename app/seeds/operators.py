from sqlalchemy.sql import text
from app.models import db, environment, Operator, SCHEMA
import json


def seed_operators():
    with open("arknights_operator_images.json", "r", encoding="utf-8") as file:
        images = json.load(file)

    with open("arknights_character_table_filtered.json", "r", encoding="utf-8") as file:
        operators = json.load(file)

        for operator in operators:
            operator_images = images[operator["name"]]
            icon_url = operator_images["icon_url"]
            elite_2_icon_url = operator_images["elite_2_icon_url"]
            tooltip_url = operator_images["tooltip_url"]

            new_operator = Operator(
                display_number=operator["displayNumber"],
                name=operator["name"],
                position=operator["position"],
                tag_list=",".join(operator["tagList"]),
                item_obtain_approach=operator["itemObtainApproach"],
                rarity=operator["rarity"],
                profession=operator["profession"],
                sub_profession_id=operator["subProfessionId"],
                icon_url=icon_url,
                elite_2_icon_url=elite_2_icon_url,
                tooltip_url=tooltip_url,
            )
            db.session.add(new_operator)

    db.session.commit()


def undo_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM operators"))

    db.session.commit()
