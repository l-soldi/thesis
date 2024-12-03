import { createBrowserRouter } from "react-router-dom";
import { getExperiences, getReservations } from "../api/methods";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error";
import Prenota from "../pages/Prenota";
import Gestisci from "../pages/Gestisci";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
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
    },
  ]);