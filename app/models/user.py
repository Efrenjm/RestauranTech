""" User class """
from app import db
from datetime import date
from flask_login import UserMixin

class User(db.Model, UserMixin):
    """ Represents user table for database 'RestauranTech' """
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    profile_picture = db.Column(db.String(2048), default=None)
    
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))
    
    company = db.relationship('Company', back_populates='user')
    user_to_branch = db.relationship('User_to_branch', back_populates='user')
    order = db.relationship('Order', back_populates='user')