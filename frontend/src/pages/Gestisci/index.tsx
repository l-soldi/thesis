import { useState } from 'react'
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Reservation } from '../../api/types'
import List from './components/List'
import './style.css'

const Gestisci = () => {
  const data = useLoaderData() as Reservation[]
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSelected = (val: number) => {
    setSelected(val)
    navigate(`/gestisci/${val}`)
  }

  const showOutlet = !!id || (!!selected && !!data.length)

  return (<>
    <h2>Le tue prenotazioni </h2>
    <div className='container'>
      <List handleSelected={handleSelected} />
      {showOutlet && <Outlet />}
    </div>
  </>
  )
}

export default Gestisci
