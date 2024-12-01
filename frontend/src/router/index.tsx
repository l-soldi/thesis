import { createBrowserRouter } from "react-router-dom";
import { getExperiences, getReservation, getReservations } from "../api/methods";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error";
import Prenota from "../pages/Prenota";
import Gestisci from "../pages/Gestisci";
import DettaglioPrenotazione from "../pages/DettaglioPrenotazione";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/prenota",
      element: <Prenota />,
      errorElement: <ErrorPage />,
      loader: getExperiences // Carica le esperienze al caricamento della pagina
    },
    {
      path: "/gestisci",
      element: <Gestisci />,
      loader: getReservations, // Carica le prenotazioni al caricamento della pagina
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":id", // Path dinamico per la visualizzazione di una prenotazione specifica
          element: <DettaglioPrenotazione />,
          loader: async ({ params }) => {
            const { id } = params;
            return id ? await getReservation(parseInt(id)) : null; // Carica la prenotazione specifica al caricamento della pagina
          },
        },
      ],
    },
  ]);