from .dbModel import User, Lobby, LobbyUser, Task, db
from werkzeug.security import generate_password_hash, check_password_hash


def test_insert():
    pass
    # db.session.add(
    #     Task(Task_Tittle="отомстить Итачи", Task_Inittime="1990-12-12 13:00:00", Task_Deadline="2020-12-12 13:00:00",
    #          Task_Status="doing", Lobby_ID=2)
    # )
    # res = db.session.query(Task.Task_ID, Task.Task_Tittle, Task.Lobby_ID).all()
    # print(res[0].Lobby_ID)
    # db.session.commit()


def register_user(data):
    login = db.session.query(User.Login).where(User.Login == data["username"]).all()
    is_username_reserved = True if login else False
    email = db.session.query(User.Email).where(User.Email == data["email"]).all()
    is_email_reserved = True if email else False
    response = {
        "isUsernameReserved": is_username_reserved,
        "isEmailReserved": is_email_reserved
    }
    if not is_email_reserved and not is_username_reserved:
        sql_add_user(data)
    return response


def sql_add_user(data):
    login = data["username"]
    password = data["password"]
    email = data["email"]
    hash = generate_password_hash(password)
    db.session.add(User(Login=login, Password=hash, Email=email, Photo_Src="/"))
    db.session.commit()


def login_user(data):
    email = db.session.query(User.Email).where(User.Email == data["email"]).all()
    is_email_exists = True if email else False
    if not is_email_exists:
        return {"isUserRegistered": False}
    password = db.session.query(User.Password).where(User.Email == data["email"])[0][0]
    is_password_correct = check_password_hash(password, data["password"])
    return {
        "isUserRegistered": True,
        "isPasswordCorrect": is_password_correct
    }
