from app import app
import requests


def check_login():
    with app.test_client() as client:
        data = {
            "username": "chelik",
            "email": "g@mail.ru",
            "password": "kekkekekek"
        }
        res = client.post('/login', json=data)

check_login()