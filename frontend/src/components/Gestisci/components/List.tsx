import { Reservation } from '../../../api/types'
import ExperienceRecap from './ExperienceRecap'
import { useLoaderData } from 'react-router-dom'

type Props = {
    handleSelected: (val: number) => void
}

const List = ({handleSelected}: Props) => {
    const data = useLoaderData() as Reservation[]
  
    return (<>
    <h2>Le tue prenotazioni </h2>
    <div className='container'>
        {data.map(elem => <ExperienceRecap {...elem} handleSelected={() => handleSelected(elem.id)}/>)}
    </div>
    </>
  )
}

export default List