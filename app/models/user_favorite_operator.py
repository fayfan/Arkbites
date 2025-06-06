from datetime import datetime
from sqlalchemy import UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod


user_favorite_operators = db.Table(
    "user_favorite_operators",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column(
        "operator_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("user_operators.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column(
        "updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today
    ),
    UniqueConstraint("user_id", "operator_id", name="_user_favorite_operator_uc"),
    schema=SCHEMA if environment == "production" else None,
)
