from app import db
from flask_login import UserMixin

class Assets(db.Model, UserMixin):
    """ Represents asset table for database 'RestauranTech' """
    __tablename__ = 'assets'
    asset_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    picture = db.Column(db.String(2048), nullable=False, default="")

    inventory = db.relationship('Inventory', back_populates='assets')
    order_details = db.relationship('Order_details', back_populates='assets')
    footprint = db.relationship('Footprint', back_populates='assets')