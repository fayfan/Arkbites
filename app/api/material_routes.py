from flask import Blueprint
from flask_login import login_required
from app.models import Material, UserMaterial

material_routes = Blueprint("materials", __name__)


@material_routes.route("/")
def materials():
    """
    Queries for all of a user's materials & returns them in a list of material dictionaries
    """
    materials = Material.query.all()
    return [material.to_dict() for material in materials]


@material_routes.route("/<int:id>")
def material(id):
    """
    Queries for a user's material by id & returns it in a dictionary
    """
    material = Material.query.get(id)
    if material:
        return material.to_dict()
    else:
        return {"message": "Material not found"}, 404


@material_routes.route("/current")
@login_required
def user_materials():
    """
    Queries for all of a user's materials & returns them in a list of material dictionaries
    """
    user_materials = UserMaterial.query.all()
    return [user_material.to_dict() for user_material in user_materials]


@material_routes.route("/current/<int:material_id>")
@login_required
def user_material(material_id):
    """
    Queries for a user's material by material_id & returns it in a dictionary
    """
    user_material = UserMaterial.query.get(material_id)
    if user_material:
        return user_material.to_dict()
    else:
        return {"message": "User material not found"}, 404
