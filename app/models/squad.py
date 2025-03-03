from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .squad_operator import squad_operators


class Squad(db.Model):
    __tablename__ = "squads"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    user = db.relationship("User", back_populates="squads")
    operators = db.relationship(
        "UserOperator",
        secondary=squad_operators,
        back_populates="squads",
        lazy="joined",
        primaryjoin=lambda: Squad.id == squad_operators.c.squad_id,
        secondaryjoin=lambda: __import__(
            "app.models.user_operator", fromlist=["UserOperator"]
        ).UserOperator.id
        == squad_operators.c.operator_id,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "operators": [operator.display_number for operator in self.operators],
        }
