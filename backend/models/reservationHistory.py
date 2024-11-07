from models.reservation import Reservation
from app import db

class ReservationHistory:
    @staticmethod
    def get_reservations_by_user(user_id: int) -> list[Reservation]:
        all_reservations = Reservation.get_by_user_id(user_id)
        user_reservations = [reservation.to_json() for reservation in all_reservations ]

        return user_reservations

    @staticmethod
    def paginate(reservations: list[Reservation], page: int, per_page: int) -> list[Reservation]:
        start = (page-1) * per_page
        end = start + per_page

        return reservations[start:end]

    # Aggiunge una nuova prenotazione al database
    @staticmethod
    def add(
            name: str,
            lastname: str,
            email: str,
            phone: str,
            date: str,
            exp_id: int,
            people_num: int,
            user_id: int) -> 'Reservation':
        new_reservation = Reservation(name=name, lastname=lastname, email=email, phone=phone, date=date, exp_id=exp_id, people_num=people_num, user_id=user_id)
        db.session.add(new_reservation)
        db.session.commit()
        return new_reservation

    @staticmethod
    def delete(id: int) -> None:
        # Elimina la entry a DB della prenotazione
        db.session.delete(Reservation.get(id))
        db.session.commit()

    # Modifica una prenotazione
    @staticmethod
    def update(
            id: int,
            name: str,
            lastname: str,
            email: str,
            phone: str,
            date: str,
            people_num: int) -> 'Reservation':
        reservation = Reservation.get(id)
        reservation.name = name
        reservation.lastname = lastname
        reservation.email = email
        reservation.phone = phone
        reservation.date = date
        reservation.people_num = int(people_num)

        db.session.commit()
        return reservation