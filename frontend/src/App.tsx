import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import Providers from '@state/Providers';

function App() {

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
