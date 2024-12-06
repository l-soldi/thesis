from app import db

# Rappresenta l'entità Esperienza
class Experience(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(250), nullable=False)
  price = db.Column(db.Float(2), nullable=False)
  imageUrl = db.Column(db.String(100), nullable=False)

  @staticmethod
  def get_by_exp_id(exp_id: int):
    return Experience.query.filter_by(id=exp_id).all()
  
  @staticmethod
  def get_all():
    return Experience.query.all()

  def to_json(self):
    return {
      "id":self.id,
      "title":self.title,
      "description":self.description,
      "price":self.price,
      "imageUrl":self.imageUrl,
    }