from models.experience import Experience
from flask import jsonify

# Funzione di utilita` per ottenere il prezzo totale
def get_total_price(reservation):
  experience = Experience.get(reservation['expId'])
  total_price = experience.price * reservation['peopleNum'] if experience else None
  return total_price

def verify_missing_fields(fields, data):
  for field in fields:
    if field not in data or not data.get(field):
      return jsonify({"error":f'Manca campo obbligatorio: {field}'}), 400 # Ritorna in risposta 400 Bad Request