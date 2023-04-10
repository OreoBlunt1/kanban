from models.dbQueries import register_user, login_user


def add_user(data):
    return register_user(data)


def add_login(data):
    return login_user(data)
