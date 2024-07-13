""" __init__ file that contains Flask instance """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:pwd@host:port/db'
    app.config['SECRET_KEY'] = 'test'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app

app = create_app()
db = SQLAlchemy(app)

from . import routes