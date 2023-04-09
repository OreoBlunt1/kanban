from flask import Flask, jsonify
from models.dbQueries import test_insert
from models.dbModel import User, db

app = Flask(__name__)
app.secret_key = "2132443452343"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///task_manager.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.route("/")
def on_request():
    test_insert()
    return jsonify({"message": "Hello!"})


@app.route("/login", methods=['POST'])
def on_post():
    return jsonify({"message": "Hello!"})


if __name__ == "__main__":
    app.run(debug=True)
