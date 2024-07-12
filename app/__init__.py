""" __init__ file that contains Flask instance """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://test:pwd@localhost/database.db'
    app.config['SECRET_KEY'] = 'test'

    db = SQLAlchemy(app)

    with app.app_context():
        db.create_all()

    return app

app = create_app()

from . import routes