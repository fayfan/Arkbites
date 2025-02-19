from datetime import datetime
from .db import db, environment, SCHEMA
from .user_operator import user_operators


class Operator(db.Model):
    __tablename__ = "operators"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    display_number = db.Column(
        db.String(10), primary_key=True, nullable=False, unique=True
    )
    name = db.Column(db.String(255), nullable=False, unique=True)
    position = db.Column(db.String(10), nullable=False)
    tag_list = db.Column(db.Array(db.String(40)))
    item_obtain_approach = db.Column(db.String(255))
    rarity = db.Column(db.String(10), nullable=False)
    profession = db.Column(db.String(20), nullable=False)
    sub_profession_id = db.Column(db.String(20), nullable=False)
    level = db.Column(db.Integer, default=0)
    created_at = (db.Column(db.DateTime, default=datetime.today),)
    updated_at = (
        db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today),
    )

    user = db.relationship("User", secondary=user_operators, back_populates="operators")

    def to_dict(self):
        return {
            "displayNumber": self.display_number,
            "name": self.name,
            "position": self.position,
            "tagList": self.tag_list,
            "itemObtainApproach": self.item_obtain_approach,
            "rarity": self.rarity,
            "profession": self.profession,
            "subProfessionId": self.sub_profession_id,
            "level": self.level,
        }
