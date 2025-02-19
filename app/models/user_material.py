from datetime import datetime
from sqlalchemy import UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod


user_materials = db.Table(
    "user_materials",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column(
        "material_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("materials.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column("quantity", db.Integer, default=0, nullable=False),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column(
        "updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today
    ),
    UniqueConstraint("user_id", "material_id", name="_user_material_uc"),
    schema=SCHEMA if environment == "production" else None,
)
