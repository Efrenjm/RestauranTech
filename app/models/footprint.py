from app import db
from flask_login import UserMixin

class Footprint(db.Model, UserMixin):
    """ Represents footprint table for database 'RestauranTech' """
    __tablename__ = 'footprint'
    footprint_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    footprint_name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    picture = db.Column(db.String(2048), nullable=False)
    conversion = db.Column(db.String(16), nullable=False)

    asset_id = db.Column(db.Integer, db.ForeignKey('assets.asset_id'))

    assets = db.relationship('Assets', back_populates='footprint')
    order_details = db.relationship('Order_details', back_populates='footprint')