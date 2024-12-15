import { initialReservation } from "."
import { Reservation } from "@api/types"
import { Actions } from "./enums"
//console.log(import.meta.resolve('@api/types'));
export const reservationReducer = (reservation: Reservation | null, action: {type: Actions, payload: Partial<Reservation>}) => {
    switch (action.type) {
      case Actions.UPDATE_RESERVATION:
        return {...reservation, ...action.payload}
      case Actions.RESET:
        return initialReservation
      default:
        return reservation
    }
  }