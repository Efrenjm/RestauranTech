from app import db
from flask_login import UserMixin

class Role(db.Model, UserMixin):
    """ Represents role table for database 'RestauranTech' """
    __tablename__ = 'role'
    role_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(128), nullable=False)
    place_order_allowed = db.Column(db.Boolean, default=True, nullable=False)
    count_inventory_allowed = db.Column(db.Boolean, default=True, nullable=False)
    adjust_inventory_allowed = db.Column(db.Boolean, default=True, nullable=False)
    accept_adjustments_allowed = db.Column(db.Boolean, default=True, nullable=False)

    user_to_branch = db.relationship('User_to_branch', back_populates='role')