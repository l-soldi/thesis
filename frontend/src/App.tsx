import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Prenota from './pages/Prenota';
import Gestisci from './pages/Gestisci';
import ErrorPage from './pages/Error';
import DettaglioPrenotazione from './pages/DettaglioPrenotazione';
import { ReservationProvider } from './state/Reservation';
import { getExperiences, getReservation, getReservations } from './api/methods';
import { ModalProvider } from './state/Modal';
import { ToastProvider } from './state/Toast';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Prenota />,
      errorElement: <ErrorPage />,
      loader: getExperiences
    },
    {
      path: "/prenota",
      element: <Prenota />,
      errorElement: <ErrorPage />,
      loader: getExperiences
    },
    {
      path: "/gestisci",
      element: <Gestisci />,
      loader: getReservations,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":id",
          element: <DettaglioPrenotazione />,
          loader: async ({ params }) => {
            const { id } = params;
            return id ? await getReservation(parseInt(id)) : null;
          },
        },
      ],
    },
  ]);

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
