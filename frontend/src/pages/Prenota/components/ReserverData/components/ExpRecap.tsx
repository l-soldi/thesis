import { useContext } from 'react'
import { ReservationContext } from '../../../../../state/Reservation'
import { useLoaderData } from 'react-router-dom'
import { Experience } from '../../../../../api/types'

const ExpRecap = () => {
    const state = useContext(ReservationContext)
    const data = useLoaderData() as Experience[]
    const experiences = data?.length > 0 ? data : []
    const selectedExperience = experiences.filter(elem => elem.id === state?.expId).length > 0 ? experiences.filter(elem => elem.id === state?.expId) : null

    return (
        <section className='side no-edit'>
            <h3> Recap dell'esperienza</h3>
            <p><b>Giorno</b>: {state?.date || "Seleziona una data"}</p>
            <p><b>Numero di persone</b>: {state?.peopleNum ?? ""}</p>
            <p><b>Esperienza scelta</b>: {selectedExperience ? selectedExperience[0].title : "Scegli una esperienza tra quelle disponibili"}</p>
            <p><b>Prezzo</b>: {selectedExperience && state?.peopleNum ? selectedExperience[0].price * state!.peopleNum : "Impossibile definire il prezzo senza un'esperienza selezionata o un numero di persone indicato"}</p>
        </section>
    )
}

export default ExpRecap