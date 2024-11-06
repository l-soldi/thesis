import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Actions } from './enums';

interface Reservation {
    id: string;
    name: string;
    lastName: string;
    date: string;
    expId: string;
    peopleNum: number;
  }

const initialReservation: Reservation | null = null;

interface ReservationContextProps {
    reservation: Reservation | null;
    setReservation: (reservation: Reservation | null) => void;
}

const ReservationContext = createContext<ReservationContextProps | null>(null);
const ReservationDispatchContext = createContext<Dispatch<any> | null>(null);

const reservationReducer = (reservation, action) => {
  switch (action.type) {
    case Actions.UPDATE_DATE: 
      return {...reservation, date: action.payload}
    case Actions.UPDATE_PEOPLE:
      return {...reservation, peopleNum: action.payload}
    case Actions.UPDATE_NAME:
      return {...reservation, name: action.payload}
    case Actions.UPDATE_LASTNAME:
      return {...reservation, lastName: action.payload}
    case Actions.UPDATE_EXP_ID:
      return {...reservation, expId: action.payload}
    case Actions.RESET:
      return initialReservation
    default:
      return reservation
  }
}

const ReservationProvider = ({children} : {children: ReactNode}) => {
    const [reservation, dispatch] = useReducer(reservationReducer, initialReservation);

    return (
      <ReservationContext.Provider value={reservation}>
        <ReservationDispatchContext.Provider value={dispatch}>
        {children}
        </ReservationDispatchContext.Provider>
      </ReservationContext.Provider>
    );
};

export { ReservationContext, ReservationDispatchContext, ReservationProvider };
