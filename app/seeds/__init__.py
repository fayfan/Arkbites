from flask.cli import AppGroup
from .operators import seed_operators, undo_operators
from .user_favorite_operators import (
    seed_user_favorite_operators,
    undo_user_favorite_operators,
)
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
        # Make sure to add all your other model's undo functions below
        undo_user_favorite_operators()
        undo_user_operators()
        undo_users()
        undo_operators()
    seed_users()
    seed_operators()
    seed_user_operators()
    seed_user_favorite_operators()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_user_favorite_operators()
    undo_user_operators()
    undo_users()
    undo_operators()
    # Add other undo functions here
