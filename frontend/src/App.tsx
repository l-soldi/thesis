import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './design-system/Navbar'
import Prenota from './components/Prenota';
import Gestisci from './components/Gestisci';
import ErrorPage from './components/Error';
import DettaglioPrenotazione from './components/DettaglioPrenotazione';
import { ReservationProvider } from './state/Reservation';
import { getExperiences, getReservations } from './api/methods';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Prenota />,
      errorElement: <ErrorPage />,
      loader: async () => {
        return await getExperiences();
      },
    },
    {
      path: "/prenota",
      element: <Prenota />,
      errorElement: <ErrorPage />,
      loader: async () => {
        return await getExperiences();
      },
    },
    {
      path: "/gestisci",
      element: <Gestisci />,
      loader: async () => {
        return await getReservations();
      },
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":id",
          element: <DettaglioPrenotazione />,
          loader: async ({ params }) => {
            const { id } = params;
            return await getReservations().then(reservations => reservations.find(reservation => reservation.id === Number(id)));
          },
        },
      ],
    },
  ]);

  return (
    <ReservationProvider>
      <Navbar />
      <main>
       <RouterProvider router={router} />
      </main>
    </ReservationProvider>
  )
}

export default App
