from app import app, db
from flask import request, jsonify
from models.reservation import Reservation
from models.experience import Experience

# Get all experiences
@app.route("/api/experiences",methods=["GET"])
def get_experiences():
  experiences = Experience.query.all() 
  result = [experience.to_json() for experience in experiences]
  return jsonify(result)

# Get all reservations
@app.route("/api/reservations",methods=["GET"])
def get_reservations():
  reservations = Reservation.query.all() 
  result = [reservation.to_json() for reservation in reservations]
  return jsonify(result)

# Create a reservation
@app.route("/api/reservations",methods=["POST"])
def create_reservation():
  try:
    data = request.json

    # Validations
    required_fields = ["name","lastname","email","phone","date","expId","peopleNum"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    lastname = data.get("lastname")
    email = data.get("email")
    phone = data.get("phone")
    date = data.get("date")
    exp_id = data.get("expId")
    people_num = data.get("peopleNum")

    new_reservation = Reservation(name=name, lastname=lastname, email=email, phone=phone, date=date, exp_id=exp_id, people_num=people_num)

    db.session.add(new_reservation) 
    db.session.commit()

    return jsonify(new_reservation.to_json()), 201

  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500

# Delete a reservation
@app.route("/api/reservations/<int:id>",methods=["DELETE"])
def delete_reservation(id):
  try:
    reservation = Reservation.query.get(id)
    if reservation is None:
      return jsonify({"error":"reservation not found"}), 404

    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg":"reservation deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

# Update a reservation
@app.route("/api/reservations/<int:id>",methods=["PATCH"])
def update_reservation(id):
  try:
    reservation = Reservation.query.get(id)
    if reservation is None:
      return jsonify({"error":"reservation not found"}), 404

    data = request.json

    reservation.name = data.get("name",reservation.name)
    reservation.lastname = data.get("lastname",reservation.lastname)
    reservation.email = data.get("email",reservation.email)
    reservation.phone = data.get("phone",reservation.phone)
    reservation.date = data.get("date",reservation.date)
    reservation.expId = data.get("expId",reservation.expId)
    reservation.peopleNum = data.get("peopleNum",reservation.peopleNum)


    db.session.commit()
    return jsonify(reservation.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500