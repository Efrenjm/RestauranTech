""" User class """
from app import db
from datetime import date
from flask_login import UserMixin

class User(db.Model, UserMixin):
    """ Represents user table for database 'restaurantech' """
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.Date, default=date.today())