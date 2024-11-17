import { createBrowserRouter } from "react-router-dom";
import Prenota from "../pages/Prenota";
import ErrorPage from "../pages/Error";
import { getExperiences, getReservation, getReservations } from "../api/methods";
import Gestisci from "../pages/Gestisci";
import DettaglioPrenotazione from "../pages/DettaglioPrenotazione";

export const router = createBrowserRouter([
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