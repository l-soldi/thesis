from app import app, db
from flask import request, jsonify
from models import Reservation

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
    required_fields = ["name","lastName","email","phone","date","expId","peopleNum"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    lastName = data.get("lastName")
    email = data.get("email")
    phone = data.get("phone")
    date = data.get("date")
    expId = data.get("expId")
    peopleNum = data.get("peopleNum")

    new_reservation = Reservation(name=name, lastName=lastName, email=email, phone=phone, date=date, expId=expId, peopleNum=peopleNum)

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
  
# Update a reservation profile
@app.route("/api/reservations/<int:id>",methods=["PATCH"])
def update_reservation(id):
  try:
    reservation = Reservation.query.get(id)
    if reservation is None:
      return jsonify({"error":"reservation not found"}), 404
    
    data = request.json

    reservation.name = data.get("name",reservation.name)
    reservation.role = data.get("role",reservation.role)
    reservation.description = data.get("description",reservation.description)
    reservation.gender = data.get("gender",reservation.gender)

    db.session.commit()
    return jsonify(reservation.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500