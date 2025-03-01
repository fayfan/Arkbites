from datetime import datetime
from sqlalchemy import UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod


squad_operators = db.Table(
    "squad_operators",
    db.Model.metadata,
    # db.Column("id", db.Integer, primary_key=True),
    db.Column(
        "squad_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("squads.id"), ondelete="CASCADE"),
        nullable=False,
        primary_key=True,
    ),
    db.Column(
        "operator_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("user_operators.id"), ondelete="CASCADE"),
        nullable=False,
        primary_key=True,
    ),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column(
        "updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today
    ),
    UniqueConstraint("squad_id", "operator_id", name="_squad_operator_uc"),
    schema=SCHEMA if environment == "production" else None,
)
