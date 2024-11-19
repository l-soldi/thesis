import { useLoaderData } from "react-router-dom"
import { FullReservation } from "../../api/types"
import { useContext, useEffect } from "react"
import { ModalContext, ModalEditContext } from "../../state/Modal"
import { ModalTypes } from "../../components/Modal/types"
import { deleteReservation, updateReservation } from "../../api/methods"
import { useApi } from "../../api/hooks/useApi"

const DettaglioPrenotazione = () => {
  const data = useLoaderData() as FullReservation
  const { showModal } = useContext(ModalContext)
  const { setFormValues, ...values } = useContext(ModalEditContext)

  const ctaUpdate = useApi(() => updateReservation(data.id, values), `/gestisci/${data.id}`, true)
  const ctaDelete = useApi(() => deleteReservation(data.id), `/gestisci`, true)

  const handleCTA = (type: ModalTypes) => {
    let cta = null
    if(type === ModalTypes.DELETE) {
      cta = ctaDelete
    }
    if(type === ModalTypes.EDIT) {
      cta = ctaUpdate
    }
    showModal({ type, cta })
  }

  useEffect(() => {
    setFormValues({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      date: data.date,
      peopleNum: data.peopleNum,
    })
  }, [data])

  return (
    <div className="exp">
      <h3> Dettaglio prenotazione</h3>
      <div>
        <p><b>Esperienza scelta</b>: {data.experience.title}</p>
        <p><b>Descrizione</b>: {data.experience.description}</p>

        <div className="details">
          <p><b>Data</b>: {data.date}</p>
          <p><b>Per</b>: {data.peopleNum} {data.peopleNum === 1 ? 'persona' : 'persone'}</p>
          <p><b>Prezzo totale</b>: {data.totalPrice}</p>
        </div>

        <div className="details">
          <span>
            <h4>Nominativo</h4>
            <p><b>Nome</b>: {data.name}</p>
            <p><b>Cognome</b>: {data.lastname}</p>
          </span>
          <span>
            <h4>Contatti</h4>
            <p><b>Email</b>: {data.email}</p>
            <p><b>Telefono</b>: {data.phone}</p>
          </span>
        </div>
      </div>
      <div className="ctas">
        <button onClick={() => {handleCTA(ModalTypes.DELETE)}} > Cancella </button>
        <button onClick={()=> {handleCTA(ModalTypes.EDIT)}}> Modifica </button>
      </div>
    </div>
  )
}

export default DettaglioPrenotazione