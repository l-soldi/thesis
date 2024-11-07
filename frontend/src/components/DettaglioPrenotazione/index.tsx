import { useParams } from "react-router-dom"

const DettaglioPrenotazione = () => {
  const {id} = useParams()
  return (
    <div>DettaglioPrenotazione {id}</div>
  )
}

export default DettaglioPrenotazione