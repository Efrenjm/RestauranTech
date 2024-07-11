#from flask import current_app as app, render_template
from flask import render_template
from app import app

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/crm')
def crm():
    return render_template('admin.html')