from sqlalchemy.sql import text
from app.models import db, environment, Operator, SCHEMA
import json


def seed_operators():
    with open("arknights_character_table_filtered.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        operators = data

        for operator in operators:
            new_operator = Operator(
                display_number=operator["displayNumber"],
                name=operator["name"],
                position=operator["position"],
                tag_list=",".join(operator["tagList"]),
                item_obtain_approach=operator["itemObtainApproach"],
                rarity=operator["rarity"],
                profession=operator["profession"],
                sub_profession_id=operator["subProfessionId"],
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
