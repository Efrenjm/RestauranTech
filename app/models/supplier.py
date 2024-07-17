from app import db
from flask_login import UserMixin

class Supplier(db.Model, UserMixin):
    """ Represents __supplier table for database 'RestauranTech' """
    __tablename__ = '__supplier'
    supplier_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    api_key = db.Column(db.String(2048), nullable=False)

    order = db.relationship('Order', back_populates='supplier')