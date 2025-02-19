from datetime import datetime
from sqlalchemy import UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .squad_operator import squad_operators
from .user_favorite_operator import user_favorite_operators


class UserOperator(db.Model):
    __tablename__ = "user_operators"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    operator_id = db.Column(
        db.String(10),
        db.ForeignKey(
            add_prefix_for_prod("operators.display_number"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    phase = db.Column(db.String(10), default="PHASE_0")
    level = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    squads = db.relationship(
        "Squad", secondary=squad_operators, back_populates="operators"
    )
    user = db.relationship(
        "User", secondary=user_favorite_operators, back_populates="favorite_operators"
    )

    __table_args__ = (
        UniqueConstraint("user_id", "operator_id", name="_user_operator_uc"),
    )

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


# user_operators = db.Table(
#     "user_operators",
#     db.Model.metadata,
#     db.Column("id", db.Integer, primary_key=True),
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
#         nullable=False,
#     ),
#     db.Column(
#         "operator_id",
#         db.String(10),
#         db.ForeignKey(
#             add_prefix_for_prod("operators.display_number"), ondelete="CASCADE"
#         ),
#         nullable=False,
#     ),
#     db.Column("phase", db.String(10), default="PHASE_0"),
#     db.Column("level", db.Integer, default=0),
#     db.Column("created_at", db.DateTime, default=datetime.today),
#     db.Column(
#         "updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today
#     ),
#     UniqueConstraint("user_id", "operator_id", name="_user_operator_uc"),
#     schema=SCHEMA if environment == "production" else None,
# )
