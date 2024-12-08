import './App.css'
import { RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import { router } from './router';
import Providers from './state/Providers';
import { deleteUserIdFromLocalStorage } from './localStorage/utils';

function App() {
  const location = window.location.pathname

  if(location === '/login' ) {
    deleteUserIdFromLocalStorage()
  }

  return (
    <Providers>
      <Navbar />
      <main>
        <RouterProvider router={router} />
      </main>
    </Providers>
  )
}

export default App
