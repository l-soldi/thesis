import { useLoaderData } from "react-router-dom"
import { FullReservation } from "../../api/types"

const DettaglioPrenotazione = () => {
  const data = useLoaderData() as FullReservation

  const handleCTA = () => {
    // TODO: implementare stato per gestione modali e toasts

  }

  return (
    <div className="exp">
      <h3> Dettaglio prenotazione</h3>
      <div>
        <p>Esperienza scelta: {data.experience.title}</p>
        <p>Descrizione: {data.experience.description}</p>

        <div className="details">
          <p>Data: {data.date}</p>
          <p>Per: {data.peopleNum} {data.peopleNum === 1 ? 'persona' : 'persone'}</p>
          <p>Prezzo: {data.totalPrice}</p>
        </div>

        <div className="details">
          <span>
            <h4>Nominativo</h4>
            <p>Nome: {data.name}</p>
            <p>Cognome: {data.lastname}</p>
          </span>
          <span>
            <h4>Contatti</h4>
            <p>Email: {data.email}</p>
            <p>Telefono: {data.phone}</p>
          </span>
        </div>
      </div>
      <div className="ctas">
        <button onClick={handleCTA}> Test toast </button>
        <button> Modifica </button>
        <button> Cancella </button>
      </div>
    </div>
  )
}

export default DettaglioPrenotazione