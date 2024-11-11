from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

#sqlAlchemy config
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///reservations.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_BINDS"] = {
    "expetiences": "sqlite:///experiences.db"
}

db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

# api routes
import routes

with app.app_context():
  db.create_all()
  from models.defaults import init_defaults
  init_defaults()

if __name__ == "__main__":
  app.run(debug=True)