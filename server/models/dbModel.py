from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    User_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    Login = db.Column(db.String(200), unique=True)
    Password = db.Column(db.String(200), unique=True)
    Photo_Src = db.Column(db.String(200), unique=True)
    Email = db.Column(db.String(200), unique=True)


class Lobby(db.Model):
    Lobby_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    Lobby_Name = db.Column(db.String(200), unique=True)
    Creator = db.Column(db.Integer, db.ForeignKey('user.User_ID'))


class LobbyUser(db.Model):
    Relashion_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('user.User_ID'))
    Lobby_ID = db.Column(db.Integer, db.ForeignKey('lobby.Lobby_ID'))


class Task(db.Model):
    Task_ID = db.Column(db.Integer, autoincrement=True, primary_key=True)
    Task_Tittle = db.Column(db.String(200))
    Task_Deadline = db.Column(db.String(200))
    Task_Inittime = db.Column(db.String(200))
    Task_Status = db.Column(db.String(200))
    Lobby_ID = db.Column(db.Integer, db.ForeignKey('lobby.Lobby_ID'))
