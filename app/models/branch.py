from app import db
from flask_login import UserMixin

class Branch(db.Model, UserMixin):
    """ Represents branch table for database 'RestauranTech' """
    __tablename__ = 'branch'
    branch_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    fiscal_address = db.Column(db.String(256), nullable=False)

    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))
    
    company = db.relationship('Company', back_populates='branch')
    user_to_branch = db.relationship('User_to_branch', back_populates='branch')
    inventory = db.relationship('Inventory', back_populates='branch')
    order = db.relationship('Order', back_populates='branch')