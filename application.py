from flask import Flask, render_template, request
from flask_debug import Debug
import os


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = 'asdfawfawerawerawerwerw453453454'
Debug(app)
app.run(debug=True)


@app.route("/")
def index():
    return render_template('home.html')