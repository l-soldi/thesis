import { useContext, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useApi } from "../../api/hooks/useApi"
import { FullReservation } from "../../api/types"
import { deleteReservation, updateReservation } from "../../api/methods"
import { ModalContext } from "../../state/Modal"
import { ModalTypes } from "../../components/Modal/types"
import Modal from "../../components/Modal"

const DettaglioPrenotazione = () => {
  const data = useLoaderData() as FullReservation
  const { showModal } = useContext(ModalContext)
  const [modalType, setModalType] = useState<ModalTypes | null>(null)

  const ctaUpdate = useApi((values) => updateReservation(data.id, values), `/gestisci/${data.id}`, true)
  const ctaDelete = useApi(() => deleteReservation(data.id), `/gestisci`, true)

  const handleCTA = (type: ModalTypes) => {
    showModal()
    setModalType(type)
  }

  const cta = modalType === ModalTypes.EDIT
    ? ctaUpdate 
    : modalType === ModalTypes.DELETE
      ? ctaDelete 
      : undefined

  return (<>
    <Modal type={modalType} cta={cta} defaultValues={data}/>
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
  </>
  )
}

export default DettaglioPrenotazione