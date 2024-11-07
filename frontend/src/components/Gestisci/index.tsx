import React from 'react'
import { Outlet } from 'react-router-dom'

const Gestisci = () => {
  // TODO: idea: al click su una prenotazione, mostrare Outlet con dettaglio prenotazione
  return (
    <div>
      Gestisci
      <Outlet />
    </div>
  )
}

export default Gestisci
