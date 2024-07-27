""" File containing all routes for the project """
from app import app, db, login_manager
from app.forms import RegisterForm, LoginForm, InventoryForm
from app.models.user import User
from app.models.inventory import Inventory
from flask import render_template, redirect, url_for, session
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('index.html',
                           logged_in=current_user.is_authenticated)


@app.route('/crm')
@login_required
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
            login_user(user)
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
            login_user(new_user)
            return redirect(url_for('crm'))

    return render_template('register.html', form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("home"))


@app.route('/inventory', methods=["GET", "POST"])
def inventory():
    form = InventoryForm()

    if form.is_submitted():
        branch_id = form.branch_id.data
        asset_id = form.asset_id.data
        quantity_in_stock = form.quantity_in_stock.data
        unit_of_measure = form.unit_of_measure.data
        average_price = form.average_price.data
        shelf_life = form.shelf_life.data
        shelf_life_unit = form.shelf_life_unit.data

        new_item = Inventory(branch_id=branch_id, asset_id=asset_id,
                             quantity_in_stock=quantity_in_stock, unit_of_measure=unit_of_measure,
                             average_price=average_price, shelf_life=shelf_life,
                             shelf_life_unit=shelf_life_unit)
        db.session.add(new_item)
        db.session.commit()
        print("item added successfully!")

    return render_template('inventory.html', form=form)