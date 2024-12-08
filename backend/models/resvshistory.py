from models.reservation import Reservation

class Resvshistory:
    @staticmethod
    def get_reservations_by_user(user_id: int):
        all_reservations = Reservation.get_by_user_id(user_id)
        user_reservations = [reservation.to_json() for reservation in all_reservations ]

        return user_reservations
    
    @staticmethod
    def paginate_reservations(reservations, page, per_page):
        start = (page-1) * per_page
        print("--------start", start)
        end = start + per_page
        print("--------end", end)
        return reservations[start:end]