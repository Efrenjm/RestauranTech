""" File containing all routes for the project """
from app import app, db
from app.forms import RegisterForm
from app.user import User
from flask import render_template, redirect, url_for
from werkzeug.security import generate_password_hash

@app.route('/menu')
def menu():
    return render_template('index.html')

@app.route('/crm')
def crm():
    return render_template('admin.html')

@app.route('/login', methods=["GET", "POST"])
def home():
    return render_template('login.html')

@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()

    if form.is_submitted():
        name = form.name.data
        email = form.email.data
        hashed_password = generate_password_hash(form.password.data,
                                                 method="pbkdf2:sha256",
                                                 salt_length=8)
        new_user = User(name=name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        print(new_user.id)
        return redirect(url_for('crm'))

    return render_template('register.html', form=form)