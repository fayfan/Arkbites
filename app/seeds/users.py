from sqlalchemy.sql import text
from app.models import db, environment, SCHEMA, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username="demo", email="demo@demo.io", password="password")
    dokutah = User(username="dokutah", email="dokutah@rhodes.is", password="password")
    amiya = User(username="amiya", email="amiya@rhodes.is", password="password")

    db.session.add(demo)
    db.session.add(dokutah)
    db.session.add(amiya)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
