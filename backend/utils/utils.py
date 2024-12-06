from app import app, db
from models.experience import Experience
# Funzione di utilita` per ottenere il prezzo totale
def get_total_price(reservation):
  experience = Experience.get_by_exp_id(reservation['expId'])[0]
  total_price = experience.price * reservation['peopleNum'] if experience else None
  return total_price