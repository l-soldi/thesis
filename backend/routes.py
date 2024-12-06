from app import app, db
from flask import request, jsonify
from models.reservation import Reservation
from models.experience import Experience
from models.user import User
from models.resvshistory import Resvshistory
from utils.errors import Errors
from utils.utils import get_total_price

# Login
@app.route('/api/login', methods=['POST'])
def login():
  email = request.json['email']
  password = request.json['password']
  user = User.get_by_email(email)  # Recupera l'utente dal database

  if user and User.check_password(user.id, password):
    return jsonify(user.to_json()), 200
  else:
    return jsonify({"error": Errors.INVALID_EMAIL_OR_PWD}), 401

# Registra l'utente
@app.route('/api/register', methods=['POST'])
def register():
  data = request.json

  # Verifica che i dati obbligatori siano presenti nella request ricevuta.
  required_fields = ["name","lastname","email","password"]
  for field in required_fields:
    if field not in data or not data.get(field):
      return jsonify({"error":f'Manca campo obbligatorio: {field}'}), 400 # Ritorna in risposta 400 Bad Request

  user = User.get_by_email(data.get("email"))  # Recupera l'utente dal database
  if user is None:
      user = User(name=data.get("name"), lastname=data.get("lastname"), email=data.get("email"), password=data.get("password"))
      db.session.add(user)
      db.session.commit()
  else:
    return jsonify({"error": Errors.USER_ALREADY_EXISTS}), 400
  return jsonify(user.to_json()), 201

# Recupera la lista di tutte le prenotazioni presenti a DB.
@app.route("/api/reservations", methods=["POST"])
def get_reservations():
  data = request.json
  user_id = data.get("userId")

  user_resvs_history = Resvshistory.get_reservations_by_user(user_id)

  for reservation in user_resvs_history:
    reservation['totalPrice'] = get_total_price(reservation)
    reservation['experience'] = Experience.get_by_exp_id(reservation['expId'])[0].to_json()
  return jsonify(user_resvs_history)

# Date le informazioni necessarie, crea una nuova prenotazione salvandola a DB.
@app.route("/api/reservations", methods=["PUT"])
def create_reservation():
  try:
    data = request.json

    # Verifica che i dati obbligatori siano presenti nella request ricevuta.
    required_fields = ["name","lastname","email","phone","date","expId","peopleNum"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Manca campo obbligatorio: {field}'}), 400 # Ritorna in risposta 400 Bad Request

    # Recupera i dati dalla request ricevuta
    name = data.get("name")
    lastname = data.get("lastname")
    email = data.get("email")
    phone = data.get("phone")
    date = data.get("date")
    exp_id = data.get("expId")
    people_num = data.get("peopleNum")
    user_id = data.get("userId")

    # Crea la nuova prenotazione
    new_reservation = Reservation(name=name, lastname=lastname, email=email, phone=phone, date=date, exp_id=exp_id, people_num=people_num, user_id=user_id)

    # Salva a DB la nuova prenotazione
    db.session.add(new_reservation) 
    db.session.commit()

    # Restituisce in risposta un JSON rappresentante la nuova prenotazione appena creata a DB e il codice HTTP 201
    return jsonify(new_reservation.to_json()), 201

  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception as e:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error":str(e)}), 500

# Dato un identificativo di prenotazione elimina a DB la stessa, se presente. 
@app.route("/api/reservations/<int:id>", methods=["DELETE"])
def delete_reservation(id):
  try:
    # Recupera la prenotazione con dato id da DB
    reservation = Reservation.get_by_id(id)
    if reservation is None:
      return jsonify({"error":Errors.RES_NOT_FOUND}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

    # Elimina la entry a DB della prenotazione
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg":"Prenotazione eliminata"}), 200 # In caso di successo restituisce 200 con un messaggio che indica che la Prenotazione è stata eliminata correttamente.
  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error": Errors.GENERAL_ERROR }),500

# Dato un identificativo di prenotazione aggiorna le informazioni presenti a DB della stessa, se presente.
@app.route("/api/reservations/<int:id>", methods=["PATCH"])
def update_reservation(id):
  try:
    # Recupera la prenotazione con dato id da DB
    reservation = Reservation.get_by_id(id)
    if reservation is None:
      return jsonify({"error": Errors.RES_NOT_FOUND}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

    data = request.json

    reservation.name = data.get("name")
    reservation.lastname = data.get("lastname")
    reservation.email = data.get("email")
    reservation.phone = data.get("phone",)
    reservation.date = data.get("date")
    reservation.peopleNum = data.get("peopleNum")

    db.session.commit()
    return jsonify(reservation.to_json()),200 # In caso di successo restituisce 200 con un messaggio che indica che la prenotazione è stata aggiornata correttamente.
  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error": Errors.GENERAL_ERROR }),500

# Recupera la lista di tutte le esperienze presenti a DB
@app.route("/api/experiences",methods=["GET"])
def get_experiences():
  experiences = Experience.get_all() 
  result = [experience.to_json() for experience in experiences]
  return jsonify(result)
