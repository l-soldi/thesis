from app import db

class Experience(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(250), nullable=False)
  price = db.Column(db.Float(2), nullable=False)
  imageUrl = db.Column(db.String(100), nullable=False)

  def to_json(self):
    return {
      "id":self.id,
      "title":self.title,
      "description":self.description,
      "price":self.price,
      "imageUrl":self.imageUrl,
    }