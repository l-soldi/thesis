import  { ReactNode } from 'react'
import { UserProvider } from './User'
import { ReservationProvider } from './Reservation'
import { ModalProvider } from './Modal'
import { ToastProvider } from './Toast'

const Providers = ({ children } : { children: ReactNode }) => {
  return (
    <UserProvider>
      <ReservationProvider>
        <ModalProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ModalProvider>
      </ReservationProvider>
    </UserProvider>
  )
}

export default Providers