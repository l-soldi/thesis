import { useLoaderData } from "react-router-dom"
import { FullReservation } from "../../api/types"
import { useContext } from "react"
import { ModalContext } from "../../state/Modal"
import { ModalTypes } from "../../components/Modal/types"
import { ToastContext } from "../../state/Toast"

const DettaglioPrenotazione = () => {
  const data = useLoaderData() as FullReservation
  const { showModal } = useContext(ModalContext)
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)

  const handleCTA = (type: ModalTypes) => {
    const cta = () => { console.log('cta ', type) }
    showModal({ type, cta })
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
        <button onClick={()=> {handleCTA(ModalTypes.EDIT)}}> Modifica </button>
        <button onClick={() => {handleCTA(ModalTypes.DELETE)}} > Cancella </button>
      </div>
    </div>
  )
}

export default DettaglioPrenotazione