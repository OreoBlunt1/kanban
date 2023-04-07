from flask import Flask, jsonify

app = Flask(__name__)
app.secret_key = "2132443452343"


@app.route("/")
def on_request():
    return jsonify({"message": "Hello!"})


if __name__ == "__main__":
    app.run(debug=True)
