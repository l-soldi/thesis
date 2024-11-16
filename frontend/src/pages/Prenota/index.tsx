import './style.css'
import DataSelection from './components/DataSelection'
import ExperiencesList from './components/ExperiencesList'
import ReserverData from './components/ReserverData/ReserverData'
import { useState } from 'react'

const Prenota = () => {
  const [showUserData, setShowUserData] = useState(false)

  return (<>
    <div className='container'>
      <DataSelection setShowUserData={setShowUserData}/>
      <ExperiencesList />
    </div>
    {showUserData && <ReserverData/>}
  </>
  )
}

export default Prenota
