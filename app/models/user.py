from datetime import datetime
from flask_login import UserMixin
from sqlalchemy import and_
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_favorite_operator import user_favorite_operators


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    # operators = db.relationship(
    #     "Operator",
    #     secondary="user_operators",
    #     back_populates="user",
    # )
    user_operators = db.relationship(
        "UserOperator", back_populates="user", lazy="joined"
    )
    favorite_operators = db.relationship(
        "UserOperator",
        secondary=user_favorite_operators,
        back_populates="favoriting_user",
        lazy="joined",
    )
    # materials = db.relationship(
    #     "Material",
    #     secondary="user_materials",
    #     back_populates="user",
    # )
    user_materials = db.relationship(
        "UserMaterial", back_populates="user", lazy="joined"
    )
    squads = db.relationship(
        "Squad",
        back_populates="user",
        lazy="joined",
        cascade="all, delete-orphan",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "operators": [
                user_operator.to_dict() for user_operator in self.user_operators
            ],
            "materials": [
                user_material.to_dict() for user_material in self.user_materials
            ],
            "squads": [squad.to_dict() for squad in self.squads],
            "favoriteOperators": [operator.id for operator in self.favorite_operators],
        }
