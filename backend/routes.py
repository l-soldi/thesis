from app import app, db
from flask import request, jsonify
from models.reservation import Reservation
from models.experience import Experience

# Recupera la lista di tutte le prenotazioni presenti a DB.
@app.route("/api/reservations",methods=["GET"])
def get_reservations():
  reservations = Reservation.query.all() 
  result = [reservation.to_json() for reservation in reservations]

  for reservation in result:
    reservation['totalPrice'] = get_total_price(reservation)
    reservation['experience'] = Experience.query.get(reservation['expId']).to_json()
  return jsonify(result)

# Dato un identificativo di prenotazione recupera a DB la stessa e la restituisce, se prensente.
@app.route("/api/reservations/<int:id>",methods=["GET"])
def get_reservation(id):
  reservation = Reservation.query.get(id)

  # Ritorna error 404 se la prenotazione non è stata trovata
  if reservation is None:
      return jsonify({"error":"Prenotazione non trovata"}), 404

  result = reservation.to_json()
  result['totalPrice'] = get_total_price(result)
  result['experience'] = Experience.query.get(result['expId']).to_json()
  return jsonify(result)

# Date le informazioni necessarie, crea una nuova prenotazione salvandola a DB.
@app.route("/api/reservations",methods=["POST"])
def create_reservation():
  try:
    data = request.json

    # Verifica che i dati mandatori siano presenti nella request ricevuta. 
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

    # Crea la nuova prenotazione 
    new_reservation = Reservation(name=name, lastname=lastname, email=email, phone=phone, date=date, exp_id=exp_id, people_num=people_num)

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
@app.route("/api/reservations/<int:id>",methods=["DELETE"])
def delete_reservation(id):
  try:
    # Recupera la prenotazione con dato id da DB
    reservation = Reservation.query.get(id)
    if reservation is None:
      return jsonify({"error":"Prenotazione non trovata"}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

    # Elimina la entry a DB della prenotazione
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg":"Prenotazione eliminata"}), 200 # In caso di successo restituisce 200 con un messaggio che indica che la Prenotazione è stata eliminata correttamente.
  # Ritorna 500 Internal Error in caso di un errore di qualsiasi tipo durante l'esecuzione della chiamata.
  except Exception as e:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error":str(e)}),500

# Dato un identificativo di prenotazione aggiorna le informazioni presenti a DB della stessa, se presente.
@app.route("/api/reservations/<int:id>",methods=["PATCH"])
def update_reservation(id):
  try:
    # Recupera la prenotazione con dato id da DB
    reservation = Reservation.query.get(id)
    if reservation is None:
      return jsonify({"error":"Prenotazione non trovata"}), 404 # Se la prenotazione non esiste ritorna 404 NOT FOUND

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
  except Exception as e:
    # In caso di errore riporta il DB in uno stato consistente.
    db.session.rollback()
    return jsonify({"error":str(e)}),500

# Recupera la lista di tutte le esperienze presenti a DB
@app.route("/api/experiences",methods=["GET"])
def get_experiences():
  experiences = Experience.query.all() 
  result = [experience.to_json() for experience in experiences]
  return jsonify(result)

# Funzione di utilita` per ottenere il prezzo totale
def get_total_price(reservation):
  experience = Experience.query.get(reservation['expId'])
  total_price = experience.price * reservation['peopleNum'] if experience else None
  return total_price