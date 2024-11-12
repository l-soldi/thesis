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
import { getExperiences, getReservation, getReservations } from './api/methods';

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
      <Navbar />
      <main>
       <RouterProvider router={router} />
      </main>
    </ReservationProvider>
  )
}

export default App
