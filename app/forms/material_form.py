from flask_wtf import FlaskForm
from wtforms import IntegerField


class MaterialForm(FlaskForm):
    quantity = IntegerField("Quantity")
