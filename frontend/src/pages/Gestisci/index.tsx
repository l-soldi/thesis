import { Outlet, useLoaderData, useParams } from 'react-router-dom'
import { Reservation } from '../../api/types'
import List from './components/List'
import './style.css'

const Gestisci = () => {
  const data = useLoaderData() as Reservation[]
  const { id } = useParams()


  const showOutlet = !!id || !!data.length

  return (<>
    <h2>Le tue prenotazioni </h2>
    <div className='container'>
      <List />
      {showOutlet && <Outlet />}
    </div>
  </>
  )
}

export default Gestisci
