import { initialReservation } from "."
import { Reservation } from "../../api/types"
import { Actions } from "./enums"

export const reservationReducer = (reservation: Reservation | null, action: {type: Actions, payload: Partial<Reservation>}) => {
    switch (action.type) {
      case Actions.UPDATE_DATE:
        return {...reservation, date: action.payload}
      case Actions.UPDATE_PEOPLE:
        return {...reservation, peopleNum: action.payload}
      case Actions.UPDATE_USER:
        return {...reservation,
          name: action.payload?.name ?? '',
          lastname: action.payload?.lastname ?? '',
          email: action.payload?.email ?? '',
          phone: action.payload?.phone ?? ''
        }
      case Actions.UPDATE_EXP_ID:
        return {...reservation, expId: action.payload}
      case Actions.RESET:
        return initialReservation
      default:
        return reservation
    }
  }