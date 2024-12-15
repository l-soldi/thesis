import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import Providers from '@state/Providers';
import { deleteUserIdFromLocalStorage } from '@localStorage/utils';

function App() {
  const location = window.location.pathname

  if(location === '/login' ) {
    deleteUserIdFromLocalStorage()
  }

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
