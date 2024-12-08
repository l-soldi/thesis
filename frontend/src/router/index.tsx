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
      loader:  async ({ request }) => {
          const url = new URL(request.url);
          const page = (url.searchParams.get("page")) ? parseInt(url.searchParams.get("page")!) : 1;
          const itemsPerPage = url.searchParams.get("itemsPerPage") ? parseInt(url.searchParams.get("itemsPerPage")!) : 5;

          return await getReservations(page, itemsPerPage);
        }, // Carica le prenotazioni al caricamento della pagina
      errorElement: <ErrorPage />,
    },
  ]);