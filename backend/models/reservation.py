from app import db

# Rappresenta l'entità Prenotazione 
class Reservation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  lastname = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(50), nullable=False)
  phone = db.Column(db.String(10), nullable=False)
  date = db.Column(db.String(10), nullable=False)
  exp_id = db.Column(db.Integer, nullable=False)
  people_num = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  @staticmethod
  def get(id: int) -> 'Reservation' :
    return Reservation.query.filter_by(id=id).first()

  @staticmethod
  def get_by_user_id(user_id: int) -> list['Reservation']:
    return Reservation.query.filter_by(user_id=user_id).all()

  # Restituisce una rappresentazione testuale dell'oggetto
  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "lastname":self.lastname,
      "email":self.email,
      "phone":self.phone,
      "date":self.date,
      "expId":self.exp_id,
      "peopleNum":self.people_num,
      "userId":self.user_id
    }
