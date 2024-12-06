from app import db

# Rappresenta l'entità Utente
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)

# Verifica se un utente con l'email specificata esiste nel database
    @staticmethod
    def user_exists(email: str) -> bool:
        return db.session.query(User.id).filter_by(email=email).scalar() is not None

# Aggiunge un nuovo utente al database
    @staticmethod
    def register(name: str, lastname: str, email: str, password: str):
        if User.user_exists(email):
            return None
        new_user = User(name=name, lastname=lastname, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

# Ritorna l'utente con l'id specificato
    @staticmethod
    def get(user_id: int):
        return User.query.get(user_id)

# Ritorna l'utente con l'email specificata
    @staticmethod
    def get_by_email(email: str):
        return User.query.filter_by(email=email).first()

# Verifica se la password fornita corrisponde a quella dell'utente
    def check_password(id: str, password: str) -> bool:
        return User.get(id).password == password

# Restituisce una rappresentazione testuale dell'oggetto
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "lastname":self.lastname,
            "email":self.email
        }