import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { reservationReducer } from './reducer';
import { formatDate } from '@utils';

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

export const initialReservation: Reservation = {
  id: '',
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: formatDate(new Date()),
  expId: 1,
  peopleNum: 1
};

const ReservationContext = createContext<Reservation | null>(null);
const ReservationDispatchContext = createContext<Dispatch<any> | null>(null);

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
