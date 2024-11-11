import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import List from './components/List'

const Gestisci = () => {
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const handleSelected = (val: number) => {
    setSelected(val)
    navigate(`/gestisci/${val}`)
  }
  return (
    <div>
      <List handleSelected={handleSelected}/>
      {!!selected && <Outlet />}
    </div>
  )
}

export default Gestisci
