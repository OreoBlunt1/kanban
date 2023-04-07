from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    User_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    Login = db.Column(db.String(200), unique=True)
    Password = db.Column(db.String(200), unique=True)
    Photo_Src = db.Column(db.String(200), unique=True)
    Email = db.Column(db.String(200), unique=True)
