from flask.cli import AppGroup
from .materials import seed_materials, undo_materials
from .operators import seed_operators, undo_operators
from .squad_operators import seed_squad_operators, undo_squad_operators
from .squads import seed_squads, undo_squads
from .user_favorite_operators import (
    seed_user_favorite_operators,
    undo_user_favorite_operators,
)
from .user_materials import seed_user_materials, undo_user_materials
from .user_operators import seed_user_operators, undo_user_operators
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        undo_user_materials()
        undo_materials()
        undo_squad_operators()
        undo_squads()
        undo_user_favorite_operators()
        undo_user_operators()
        undo_operators()
        undo_users()
    seed_users()
    seed_operators()
    seed_user_operators()
    seed_user_favorite_operators()
    seed_squads()
    seed_squad_operators()
    seed_materials()
    seed_user_materials()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_user_materials()
    undo_materials()
    undo_squad_operators()
    undo_squads()
    undo_user_favorite_operators()
    undo_user_operators()
    undo_operators()
    undo_users()
