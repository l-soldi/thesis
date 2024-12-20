from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# Istanzia e ritorna l'app Flask
def create_app():
  app = Flask(__name__)
  CORS(app)
  return app

# Istanzia e ritorna SQLAlchemy, ORM utilizzato per interfacciarsi con un db SQLite
def create_db(app):
  # Configura l'app Flask per interfacciarsi con l'ORM SQLAlchemy
  # Se testing è true utilizza delle istanze dei file di test in modo da avere dei dati da poter usare per i test delle chiamate
  # senza andare ad intaccare i dati di "prod"
  if app.testing:
    # Test
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test_reservations.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_BINDS"] = {
      "experiences": "sqlite:///test_experiences.db",
      "users": "sqlite:///test_users.db",
    }
  else: 
    # Prod
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///reservations.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_BINDS"] = {
      "experiences": "sqlite:///experiences.db",
      "users": "sqlite:///users.db",
    }
  return SQLAlchemy(app)

# Inizializzazione
app = create_app()
db = create_db(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Definisce la route "/" utilizzata come punto di ingresso per l'applicativo.
# In particolare restituisce un HTML (index.html) recuperato dalle folder di sistema (nello specifico il FE è contenuto in "../frontend").
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
    # La funzione "send_from_directory" di Flask ci permette di ritornare come risposta della chiamata HTTP ricevuta il file html recuperato in precendenza.
  return send_from_directory(dist_folder,filename)

# api routes
import routes

with app.app_context():
  db.create_all()
  from models.defaults import init_defaults
  init_defaults() ## Inizializza l'applicativo con dei dati di esempio per dare modo di testare l'esperienza di utilizzo dello stesso.

if __name__ == "__main__":
  # Start dell'applicativo
  app.run(debug=True)