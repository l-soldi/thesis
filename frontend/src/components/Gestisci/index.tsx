import React from 'react'
import { Outlet } from 'react-router-dom'
import List from './components/List'

const Gestisci = () => {
  // TODO: idea: al click su una prenotazione, mostrare Outlet con dettaglio prenotazione
  return (
    <div>
      Gestisci
      <List />
      <Outlet />
    </div>
  )
}

export default Gestisci
