import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

metadata = db.MetaData()
Base = declarative_base()

user = db.Table(
    "user",
    metadata,
    db.Column("id", db.Integer, autoincrement=True, primary_key=True),
    db.Column("login", db.String(200), unique=True, nullable=False),
    db.Column("hashed_password", db.String(length=1024), nullable=False),
    db.Column("photo_src", db.String(200), unique=True),
    db.Column("email", db.String(200), unique=True, nullable=False),
    db.Column("is_active", db.Boolean, default=True, nullable=False),
    db.Column("is_superuser", db.Boolean, default=False, nullable=False),
    db.Column("is_verified", db.Boolean, default=False, nullable=False)
)


lobby = db.Table(
    "lobby",
    metadata,
    db.Column("lobby_id", db.Integer, autoincrement=True, primary_key=True),
    db.Column("lobby_name", db.String(200)),
    db.Column("creator", db.Integer, db.ForeignKey('user.id'))
)


lobby_user = db.Table(
    "lobby_user",
    metadata,
    db.Column("relashion_id", db.Integer, autoincrement=True, primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey('user.id')),
    db.Column("lobby_id", db.Integer, db.ForeignKey('lobby.lobby_id'))
)

task = db.Table(
    "task",
    metadata,
    db.Column("task_id", db.Integer, autoincrement=True, primary_key=True),
    db.Column("task_tittle", db.String(200)),
    db.Column("task_deadline", db.TIMESTAMP, default=datetime.now()),
    db.Column("task_inittime", db.TIMESTAMP),
    db.Column("task_status", db.String(200)),
    db.Column("actor", db.String(200)),
    db.Column("lobby_id", db.Integer, db.ForeignKey('lobby.lobby_id'))
)
