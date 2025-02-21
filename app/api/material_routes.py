from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Material, UserMaterial
from app.forms import MaterialForm

material_routes = Blueprint("materials", __name__)


@material_routes.route("/")
def get_materials():
    """
    Queries for all materials & returns them in a list of dictionaries
    """
    materials = Material.query.all()
    return [material.to_dict() for material in materials]


@material_routes.route("/<int:material_id>")
def get_material(material_id):
    """
    Queries for a material by id & returns it in a dictionary
    """
    material = Material.query.get(material_id)

    if not material:
        return {"message": "Material not found"}, 404

    return material.to_dict()


@material_routes.route("/<int:material_id>", methods=["POST"])
@login_required
def add_user_material(material_id):
    """
    Queries for a material by id & adds it to the user's account
    """
    form = MaterialForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_user_material = UserMaterial(
            user_id=current_user.id,
            material_id=material_id,
            quantity=form.quantity.data,
        )

        db.session.add(new_user_material)
        db.session.commit()
        return new_user_material.to_dict()

    return form.errors, 400


@material_routes.route("/current")
@login_required
def get_user_materials():
    """
    Queries for all of a user's materials & returns them in a list of dictionaries
    """
    user_id = current_user.id
    user_materials = UserMaterial.query.filter(UserMaterial.user_id == user_id).all()
    return [user_material.to_dict() for user_material in user_materials]


@material_routes.route("/current/<int:material_id>")
@login_required
def get_user_material(material_id):
    """
    Queries for a user's material by id & returns it in a dictionary
    """
    user_id = current_user.id
    user_material = UserMaterial.query.filter(
        UserMaterial.user_id == user_id, UserMaterial.material_id == material_id
    ).first()

    if not user_material:
        return {"message": "User material not found"}, 404

    return user_material.to_dict()


@material_routes.route("/current/<int:material_id>", methods=["PUT"])
@login_required
def edit_user_material(material_id):
    """
    Queries for a user's material by id & edits it
    """
    form = MaterialForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.id
    edited_user_material = UserMaterial.query.filter(
        UserMaterial.user_id == user_id, UserMaterial.material_id == material_id
    ).first()

    if not edited_user_material:
        return {"message": "User material not found"}, 404
    elif form.validate_on_submit():
        form.populate_obj(edited_user_material)
        db.session.commit()
        return edited_user_material.to_dict()

    return form.errors, 400


@material_routes.route("/current/<int:material_id>", methods=["DELETE"])
@login_required
def delete_user_material(material_id):
    """
    Queries for a user's material by id & deletes it
    """
    user_id = current_user.id
    deleted_user_material = UserMaterial.query.filter(
        UserMaterial.user_id == user_id, UserMaterial.material_id == material_id
    ).first()

    if not deleted_user_material:
        return {"message": "User material not found"}, 404

    db.session.delete(deleted_user_material)
    db.session.commit()
    return {"message": "Successfully deleted"}
