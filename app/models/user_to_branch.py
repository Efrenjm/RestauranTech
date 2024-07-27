from app import db
from flask_login import UserMixin

class User_to_branch(db.Model, UserMixin):
    """ Represents company table for database 'RestauranTech' """
    __tablename__ = 'user_to_branch'
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True)
    branch_id = db.Column(db.Integer, db.ForeignKey('branch.branch_id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))
    
    user = db.relationship('User', back_populates='user_to_branch')
    branch = db.relationship('Branch', back_populates='user_to_branch')
    role = db.relationship('Role', back_populates='user_to_branch')