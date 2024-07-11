from flask import Flask
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)

    #with app.app_context():
    #    from . import routes
    return app

app = create_app()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'test'
db = SQLAlchemy(app)

from . import routes