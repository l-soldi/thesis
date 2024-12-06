from models.reservation import Reservation

class Resvshistory:
    @staticmethod
    def get_reservations_by_user(user_id: int):
        all_reservations = Reservation.get_by_user_id(user_id)
        user_reservations = [reservation.to_json() for reservation in all_reservations ]

        return user_reservations