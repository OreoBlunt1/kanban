from .dbModel import User, db
def test_insert():
    db.session.add(
        User(Login="harry", Password="поттер", Photo_Src="/src/img/harry", Email="harry@mail.ru"))
    db.session.commit()