""" Contains form for login and register """
from app.user import User
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError


class RegisterForm(FlaskForm):
    """ Represents registration form """
    name = StringField(validators=[InputRequired(), Length(min=4, max=64)],
                       render_kw={"placeholder": "Username"})
    email = StringField(validators=[InputRequired(), Length(min=4, max=128)],
                        render_kw={"placeholder": "Email"})
    password = PasswordField(validators=[InputRequired(), Length(min=2, max=128)],
                             render_kw={"placeholder": "Password"})
    submit = SubmitField("Register")

    #def validate_email(self, email):
    #    existing_email = User.query.filter_by(email=email.data).first()
    #    if existing_email:
    #        raise ValidationError("An account is already registered with specified email.")
        
    #def validate_name(self, name):
    #    existing_name = User.query.filter_by(name=name.data).first()
    #    if existing_name:
    #        raise ValidationError("That name already exists.")