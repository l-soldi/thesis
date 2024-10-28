import { ReactNode } from 'react'
import { ReservationProvider } from './Reservation'
import { ModalProvider } from './Modal'
import { ToastProvider } from './Toast'

const Providers = ({ children } : { children: ReactNode }) => {
  return (
      <ReservationProvider>
        <ModalProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ModalProvider>
      </ReservationProvider>
  )
}

export default Providers