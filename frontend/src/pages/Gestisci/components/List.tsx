import { FullReservation } from '../../../api/types'
import Empty from './Empty'
import ExperienceRecap from './ExperienceRecap'
import { useLoaderData } from 'react-router-dom'

type Props = {
    handleSelected: (val: number) => void,
}

const List = ({handleSelected }: Props) => {
    const data =useLoaderData() as FullReservation[]

    return (
    <div className="detail">
        {!data.length
            ? <Empty />
            : <div className='exp-list'>
                {data.map(elem => <ExperienceRecap key={`exp-recap${elem.id}`} {...elem} handleSelected={() => handleSelected(elem.id)}/>)}
              </div>
        }
    </div>
  )
}

export default List