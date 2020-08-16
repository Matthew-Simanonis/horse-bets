from flask import Flask, render_template, request
from flask_debug import Debug
import os

application = app = Flask(__name__)

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = '08943u50930u9jfsajsdhfaseujfij345j9034u5asedfasdfasdf4'


@application.route("/")
def index():
    return render_template('home.html')

@app.route("/")
def index():
    return render_template('home.html')

if __name__ == '__main__':
    app.run()