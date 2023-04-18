from flask import Flask, jsonify, request
from models.dbQueries import test_insert
from models.dbModel import db
from controllers.controllers import add_user, add_login

app = Flask(__name__)
app.secret_key = "2132443452343"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///task_manager.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.route("/")
def on_request():
    test_insert()
    return jsonify({"message": "Hello!"})


@app.route("/signup", methods=['POST'])
def signup():
    res = add_user(request.json)
    return jsonify(res)


@app.route("/login", methods=['POST'])
def login():
    res = add_login(request.json)
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)
