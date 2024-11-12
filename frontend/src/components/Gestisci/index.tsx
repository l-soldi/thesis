import { useState } from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import List from './components/List'
import { Reservation } from '../../api/types'
import './style.css'

const Gestisci = () => {
  const data = useLoaderData() as Reservation[]
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const handleSelected = (val: number) => {
    setSelected(val)
    navigate(`/gestisci/${val}`)
  }

  const showOutlet = !!selected && !!data.length

  return (<>
    <h2>Le tue prenotazioni </h2>
    <div className='container'>
      <List handleSelected={handleSelected} showOutlet={showOutlet}/>
      {showOutlet && <Outlet />}
    </div>
  </>
  )
}

export default Gestisci
