from sqlalchemy.sql import text
from app.models import db, environment, Operator, SCHEMA, UserOperator


def seed_user_operators():
    names_1 = [
        "Cantabile",
        "Bagpipe",
        "Thorns",
        "Blaze",
        "Mudrock",
        "Penance",
        "Typhon",
        "Wiš'adel",
        "Logos",
        "Texas the Omertosa",
        "Eyjafjalla the Hvít Aska",
        "Kirin R Yato",
        "Amiya",
    ]
    for name in names_1:
        operator_id = Operator.query.filter_by(name=name).first().display_number
        user_operator = UserOperator(
            user_id=2, operator_id=operator_id, phase="PHASE_2", level=60
        )
        db.session.add(user_operator)

    names_2 = ["Kal'tsit", "Amiya", "12F", "Durin", "Noir Corne", "Rangers", "Yato"]
    for name in names_2:
        operator_id = Operator.query.filter_by(name=name).first().display_number
        user_operator = UserOperator(user_id=3, operator_id=operator_id)
        db.session.add(user_operator)

    db.session.commit()


def undo_user_operators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_operators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_operators"))

    db.session.commit()
