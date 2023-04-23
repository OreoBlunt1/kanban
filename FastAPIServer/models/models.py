import sqlalchemy as db
from datetime import datetime

metadata = db.MetaData()

user = db.Table(
    "User",
    metadata,
    db.Column("User_ID", db.Integer, autoincrement=True, primary_key=True),
    db.Column("Login", db.String(200), unique=True),
    db.Column("Password", db.String(200)),
    db.Column("Photo_Src", db.String(200), unique=True),
    db.Column("Email", db.String(200), unique=True)

)

lobby = db.Table(
    "Lobby",
    metadata,
    db.Column("Lobby_ID", db.Integer, autoincrement=True, primary_key=True),
    db.Column("Lobby_Name", db.String(200)),
    db.Column("Creator", db.Integer, db.ForeignKey('User.User_ID'))
)

lobby_user = db.Table(
    "Lobby_User",
    metadata,
    db.Column("Relashion_ID", db.Integer, autoincrement=True, primary_key=True),
    db.Column("User_ID", db.Integer, db.ForeignKey('User.User_ID')),
    db.Column("Lobby_ID", db.Integer, db.ForeignKey('Lobby.Lobby_ID'))
)

task = db.Table(
    "Task",
    metadata,
    db.Column("Task_ID", db.Integer, autoincrement=True, primary_key=True),
    db.Column("Task_Tittle", db.String(200)),
    db.Column("Task_Deadline", db.TIMESTAMP, default=datetime.now()),
    db.Column("Task_Inittime", db.TIMESTAMP),
    db.Column("Task_Status", db.String(200)),
    db.Column("Lobby_ID", db.Integer, db.ForeignKey('Lobby.Lobby_ID'))
)

