import { useParams } from 'react-router-dom';
import { FullReservation } from '../../../api/types'

type Props = FullReservation & {
  handleSelected: () => void;
}

const ExperienceRecap = (props: Props) => {
  const {id } = useParams()
  return (
    <div onClick={props.handleSelected} className={`exp-recap-card ${id && parseInt(id) === props.id ? "selected" : ""}`}>
        <h3>{props.experience.title}</h3>
        <p>Data: {props.date}</p>
        <p>A nome: {props.name} {props.lastname}</p>
    </div>
  )
}

export default ExperienceRecap