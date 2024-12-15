from app import app, db
from flask import request, jsonify
from models.reservation import Reservation
from models.experience import Experience
from models.user import User
from models.reservationHistory import ReservationHistory
from utils.errors import Errors
from utils.utils import get_total_price, verify_missing_fields

# Login
@app.route('/api/login', methods=['POST'])
def login():
  email = request.json['email']
  password = request.json['password']
  user = User.get_by_email(email)  # Recupera l'utente dal database

  if user and User.verify_password(user.id, password):
    return jsonify(user.to_json()), 200
  else:
    return jsonify({"error": Errors.INVALID_EMAIL_OR_PWD.value}), 401

# Registra l'utente
@app.route('/api/register', methods=['POST'])
def register():
  data = request.json

  # Verifica che i dati obbligatori siano presenti nella request ricevuta.
  required_fields = ["name","lastname","email","password"]
  verify_missing_fields(required_fields, data)

  user = User.get_by_email(data.get("email"))  # Verifica che l'utente non esista già nel database
  if user is None:
      user = User.register(data.get("name"), data.get("lastname"), data.get("email"), data.get("password"))
  else:
    return jsonify({"error": Errors.USER_ALREADY_EXISTS.value}), 400
  return jsonify(user.to_json()), 201

# Recupera la lista di tutte le prenotazioni presenti a DB.
@app.route("/api/reservations", methods=["POST"])
def get_reservations():
  data = request.json
  args = request.args

  user_id = data.get("userId")

  page = args.get("page") or 1
  per_page = args.get("perPage") or 5

  user_resvs_history = ReservationHistory.get_reservations_by_user(user_id)
  user_resvs_history_paginated = ReservationHistory.paginate(user_resvs_history, int(page), int(per_page))

  for reservation in user_resvs_history_paginated:
    reservation['totalPrice'] = get_total_price(reservation)
    reservation['experience'] = Experience.get(reservation['expId']).to_json()

  items = user_resvs_history_paginated
  total_items = len(user_resvs_history)

  return jsonify({"items": items, "totalItems": total_items})

# Date le informazioni necessarie, crea una nuova prenotazione salvandola a DB.
@app.route("/api/reservations", methods=["PUT"])
def create_reservation():
  try:
    data = request.json

    # Verifica che i dati obbligatori siano presenti nella request ricevuta.
    required_fields = ["name","lastname","email","phone","date","expId","peopleNum"]
    verify_missing_fields(required_fields, data)

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
    new_reservation = ReservationHistory.add(name, lastname, email, phone, date, exp_id, people_num, user_id)

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
    reservation = Reservation.get(id)
    if reservation is None:
      return jsonify({"error": Errors.RES_NOT_FOUND.value}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

    ReservationHistory.delete(id)
    return jsonify({"msg":"Prenotazione eliminata"}), 200 # In caso di successo restituisce 200 con un messaggio che indica che la Prenotazione è stata eliminata correttamente.
  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error": Errors.GENERAL_ERROR.value }),500

# Dato un identificativo di prenotazione aggiorna le informazioni presenti a DB della stessa, se presente.
@app.route("/api/reservations/<int:id>", methods=["PATCH"])
def update_reservation(id):
  try:
    # Recupera la prenotazione con dato id da DB
    reservation = Reservation.get(id)
    if reservation is None:
      return jsonify({"error": Errors.RES_NOT_FOUND.value}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

    data = request.json

    ReservationHistory.update(id, data.get("name"), data.get("lastname"), data.get("email"), data.get("phone"), data.get("date"), data.get("peopleNum"))

    return jsonify(reservation.to_json()),200 # In caso di successo restituisce 200 con un messaggio che indica che la prenotazione è stata aggiornata correttamente.
  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error": Errors.GENERAL_ERROR.value }),500

# Recupera la lista di tutte le esperienze presenti a DB
@app.route("/api/experiences", methods=["GET"])
def get_experiences():
  experiences = Experience.get_all()
  result = [experience.to_json() for experience in experiences]
  return jsonify(result)
