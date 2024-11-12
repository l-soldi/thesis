import React from 'react'
import { Reservation } from '../../../api/types'

type Props = Reservation & { handleSelected: () => void}

const ExperienceRecap = (props: Props) => {

  return (
    <div onClick={props.handleSelected} className='exp-recap-card'>
        <h3>{props.id}</h3>
        <p>{props.name}</p>
        <p>{props.lastname}</p>
        <p>{props.date}</p>
        <p>{props.email}</p>
    </div>
  )
}

export default ExperienceRecap