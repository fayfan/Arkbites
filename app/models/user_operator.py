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

    user = db.relationship(
        "User",
        back_populates="user_operators",
        # lazy="joined",
    )
    favoriting_user = db.relationship(
        "User",
        secondary=user_favorite_operators,
        back_populates="favorite_operators",
        # lazy="joined",
    )
    squads = db.relationship(
        "Squad",
        secondary=squad_operators,
        back_populates="operators",
        # lazy="joined",
    )

    __table_args__ = (
        UniqueConstraint("user_id", "operator_id", name="_user_operator_uc"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "operatorId": self.operator_id,
            "phase": self.phase,
            "level": self.level,
            # "squads": [squad.id for squad in self.squads],
        }
