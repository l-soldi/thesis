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
      /* TODO: scommentare quando sarà pronto il BE
      idea: usare un loader per caricare i dati dal BE
        loader: async () => {
        return fakeDb.from("teams").select("*");
        },
      oppure
         loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`);
        },
      vedi: https://reactrouter.com/en/main/route/loader#loader
    */
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":id",
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
