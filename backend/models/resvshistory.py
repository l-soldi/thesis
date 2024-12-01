from reservation import Reservation

class Resvshistory:
    def get_reservations_by_user(self, user_id: int):
        all_reservations = Reservation.get()
        user_reservations = [res for res in all_reservations if res.user_id == user_id]
        return user_reservations