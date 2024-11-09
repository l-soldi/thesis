from app import db

class Reservation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  lastname = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(50), nullable=False)
  phone = db.Column(db.String(10), nullable=False)
  date = db.Column(db.String(10), nullable=False)
  expId = db.Column(db.Number(2), nullable=True)
  peopleNumb = db.Column(db.Number(1), nullable=True)


  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "lastname":self.lastname,
      "email":self.email,
      "phone":self.phone,
      "date":self.date,
      "expId":self.expId,
      "peopleNumb":self.peopleNumb
    }