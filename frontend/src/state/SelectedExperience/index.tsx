/* import { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface Reservation {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    date: string;
    expId: number;
    peopleNum: number;
  }

const initialReservation: Reservation = {
  id: '',
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: '',
  expId: 0,
  peopleNum: 1
};

const ReservationContext = createContext<Reservation | null>(null);
const ReservationDispatchContext = createContext<Dispatch<any> | null>(null);

const reservationReducer = (reservation: Reservation | null, action: {type: Actions, payload: Partial<Reservation>}) => {
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
 */