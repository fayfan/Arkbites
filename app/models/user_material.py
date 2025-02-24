from datetime import datetime
from sqlalchemy import UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod


class UserMaterial(db.Model):
    __tablename__ = "user_materials"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    material_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("materials.id"), ondelete="CASCADE"),
        nullable=False,
    )
    quantity = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    user = db.relationship(
        "User",
        back_populates="user_materials",
        # lazy="joined",
    )
    material = db.relationship("Material", back_populates="user_materials")

    __table_args__ = (
        UniqueConstraint("user_id", "material_id", name="_user_material_uc"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "materialId": self.material_id,
            "quantity": self.quantity,
            "iconId": self.material.to_dict()["iconId"],
            "name": self.material.to_dict()["name"],
            "rarity": self.material.to_dict()["rarity"],
        }
