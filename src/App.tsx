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

function App() {
  // TODO: Create context and state for the app

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Prenota />,
      errorElement: <ErrorPage />
    },
    {
      path: "/prenota",
      element: <Prenota />,
      errorElement: <ErrorPage />
    },
    {
      path: "/gestisci",
      element: <Gestisci />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":idPrenotazione",
          element: <DettaglioPrenotazione />,
        },
      ],
    },
  ]);

  return (
    <ReservationProvider>
      <Navbar />
       <RouterProvider router={router} />
    </ReservationProvider>
  )
}

export default App
