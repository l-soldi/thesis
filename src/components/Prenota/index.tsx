import React from 'react'
import './style.css'
import DataSelection from './components/DataSelection'
import RoomsList from './components/RoomsList'
import ReserverData from './components/ReserverData'

const Prenota = () => {
  return (<>
    <div className='container'>
      <DataSelection />
      <RoomsList />
    </div>
    <ReserverData />
  </>
  )
}

export default Prenota
