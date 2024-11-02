import { createContext, ReactNode, useMemo, useState } from 'react';

interface Reservation {
    id: string;
    name: string;
    lastName: string;
    dateFrom: string;
    dateTo: string;
    roomId: string;
    adults: number;
    children: number;
  }
const initialReservation: Reservation | null = null;

interface ReservationContextProps {
    reservation: Reservation | null;
    setReservation: (reservation: Reservation | null) => void;
}

const ReservationContext = createContext<ReservationContextProps | null>(null);


const ReservationProvider = ({children} : {children: ReactNode}) => {
    const [reservation, setReservation] = useState<Reservation | null>(initialReservation);

    const value = useMemo(() => ({
        reservation,
        setReservation
    }), [reservation, setReservation]);

    return (
      <ReservationContext.Provider value={value}>
        {children}
      </ReservationContext.Provider>
    );
};

export { ReservationContext, ReservationProvider };
