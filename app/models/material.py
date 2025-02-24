from datetime import datetime
from .db import db, environment, SCHEMA


class Material(db.Model):
    __tablename__ = "materials"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    rarity = db.Column(db.String(10), nullable=False)
    icon_id = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    # user = db.relationship(
    #     "User", secondary="user_materials", back_populates="materials"
    # )
    user_materials = db.relationship(
        "UserMaterial", back_populates="material", lazy="joined"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "rarity": self.rarity,
            "iconId": self.icon_id,
        }
