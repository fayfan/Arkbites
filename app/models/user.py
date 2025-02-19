from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_favorite_operator import user_favorite_operators
from .user_material import user_materials
from .user_operator import UserOperator


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

    operators = db.relationship(
        "Operator", secondary=UserOperator.__tablename__, back_populates="user"
    )
    materials = db.relationship(
        "Material", secondary=user_materials, back_populates="user"
    )
    squads = db.relationship(
        "Squad",
        back_populates="user",
        lazy="joined",
        cascade="all, delete-orphan",
    )
    favorite_operators = db.relationship(
        "UserOperator", secondary=user_favorite_operators, back_populates="user"
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
            "operators": [operator for operator in self.operators]
            if self.operators
            else [],
            "materials": [material for material in self.materials]
            if self.materials
            else [],
            "squads": [squad for squad in self.squads] if self.squads else [],
            "favoriteOperators": [operator for operator in self.favorite_operators]
            if self.favorite_operators
            else [],
        }
