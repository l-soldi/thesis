import { useContext } from 'react'
import { ReservationContext } from '../../../../../state/Reservation'
import { experiences } from '../../../../../components/CardCarousel/data'
const ExpRecap = () => {
    const state = useContext(ReservationContext)

    return (
        <section className='side no-edit'>
            <h3> Recap dell'esperienza</h3>
            <p><b>Giorno</b>: {state!.date}</p>
            <p><b>Numero di persone</b>: {state!.peopleNum}</p>
            <p><b>Esperienza scelta</b>: {experiences.filter(elem => elem.id === state!.expId)[0].title}</p>
            <p><b>Prezzo</b>: {experiences.filter(elem => elem.id === state!.expId)[0].price}</p>
        </section>
    )
}

export default ExpRecap