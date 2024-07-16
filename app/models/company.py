from app import db
from flask_login import UserMixin

class Company(db.Model, UserMixin):
    """ Represents company table for database 'RestauranTech' """
    __tablename__ = 'company'
    company_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    RFC = db.Column(db.String(256), nullable=False)
    fiscal_address = db.Column(db.String(256), nullable=False)

    user = db.relationship('User', back_populates='company')
    branch = db.relationship('Branch', back_populates='company')