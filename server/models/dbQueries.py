from .dbModel import User, Lobby, LobbyUser, Task,  db
def test_insert():
    pass
    # db.session.add(
    #     Task(Task_Tittle="отомстить Итачи", Task_Inittime="1990-12-12 13:00:00", Task_Deadline="2020-12-12 13:00:00",
    #          Task_Status="doing", Lobby_ID=2)
    # )
    # res = db.session.query(Task.Task_ID, Task.Task_Tittle, Task.Lobby_ID).all()
    # print(res[0].Lobby_ID)
    # db.session.commit()