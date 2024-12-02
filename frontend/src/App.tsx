import './App.css'
import { RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar'
import { ReservationProvider } from './state/Reservation';
import { ModalProvider } from './state/Modal';
import { ToastProvider } from './state/Toast';
import { router } from './router';
import { deleteUserIdFromLocalStorage } from './localStorage/utils';

function App() {
  const location = window.location.pathname

  if(location === '/login' ) {
    deleteUserIdFromLocalStorage()
  }

  return (
    <ReservationProvider>
      <ModalProvider>
        <ToastProvider>
          <Navbar />
          <main>
            <RouterProvider router={router} />
          </main>
        </ToastProvider>
      </ModalProvider>
    </ReservationProvider>
  )
}

export default App
