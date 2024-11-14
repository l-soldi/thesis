import { FullReservation } from '../../../api/types'
import Empty from './Empty'
import ExperienceRecap from './ExperienceRecap'
import { useLoaderData } from 'react-router-dom'

type Props = {
    handleSelected: (val: number) => void,
    showOutlet?: boolean
}

const List = ({handleSelected, showOutlet }: Props) => {
    const data = useLoaderData() as FullReservation[]

    return (
    <div className={`detail-${showOutlet ? 'extend' : 'collapse'}`}>
        {!data.length && <Empty />}
        {data && <div className='exp-list'>
            {data.map(elem => <ExperienceRecap key={`exp-recap${elem.id}`} {...elem} handleSelected={() => handleSelected(elem.id)}/>)}
        </div>}
    </div>
  )
}

export default List