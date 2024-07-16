from app import db
from flask_login import UserMixin

class Order_details(db.Model, UserMixin):
    """ Represents inventory table for database 'RestauranTech' """
    __tablename__ = 'order_details'
    unit_price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    final_price = db.Column(db.Float, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey('order.order_id'), primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.asset_id'), primary_key=True)
    footprint_id = db.Column(db.Integer, db.ForeignKey('footprint.footprint_id'), primary_key=True)

    order = db.relationship('Order', back_populates='order_details')
    assets = db.relationship('Assets', back_populates='order_details')
    footprint = db.relationship('Footprint', back_populates='order_details')