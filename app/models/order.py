from app import db
from datetime import date
from flask_login import UserMixin

class Order(db.Model, UserMixin):
    """ Represents order table for database 'RestauranTech' """
    __tablename__ = 'order'
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_date = db.Column(db.Date, nullable=False, default=date.today)
    total_price = db.Column(db.Float, nullable=False)
    expected_delivery_date = db.Column(db.Date, nullable=False, default=date.today)

    branch_id = db.Column(db.Integer, db.ForeignKey('branch.branch_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('__supplier.supplier_id'))

    branch = db.relationship('Branch', back_populates='order')
    user = db.relationship('User', back_populates='order')
    order_details = db.relationship('Order_details', back_populates='order')
    supplier = db.relationship('Supplier', back_populates='order')