from models.reservation import Reservation

class Resvshistory:
    @staticmethod
    def get_reservations_by_user(user_id: int):
        print("user_id", user_id)
        all_reservations = Reservation.get()
        all_reservations = [reservation.to_json() for reservation in all_reservations ]
        print("all_reservations", all_reservations)
        res = [rres for rres in all_reservations if rres['userId'] == user_id]
        print("res", res)
        user_reservations = [user_reservation for user_reservation in res if user_reservation['userId'] == user_id]
        print("user_reservations", user_reservations)
        return user_reservations