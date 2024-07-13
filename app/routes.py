""" File containing all routes for the project """
from app import app, db
from app.forms import RegisterForm, LoginForm
from app.user import User
from flask import render_template, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash


@app.route('/crm')
def crm():
    return render_template('admin.html')


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()

    if form.is_submitted():
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()

        if not user:
            print("user doesn't exist")
            return redirect(url_for("login"))
        
        elif not check_password_hash(user.password, password):
            print("wrong password")
            return redirect(url_for("login"))
        
        else:
            session["iduser"] = user.id
            return redirect(url_for("crm"))

    return render_template('login.html', form=form)


@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()

    if form.is_submitted():
        email = form.email.data
        if not form.duplicate_email(email):
            name = form.name.data
            hashed_password = generate_password_hash(form.password.data,
                                                    method="pbkdf2:sha256",
                                                    salt_length=8)
            new_user = User(name=name, email=email, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('crm'))

    return render_template('register.html', form=form)