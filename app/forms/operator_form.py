from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField


class OperatorForm(FlaskForm):
    phase = StringField("Phase")
    level = IntegerField("Level")
