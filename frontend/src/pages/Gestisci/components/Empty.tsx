import { useNavigate } from 'react-router-dom'

const Empty = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/prenota')
    }

  return (<>
    <h3>Non hai prenotazioni</h3>
    <button onClick={handleClick}>Prenota subito</button>
  </>
  )
}

export default Empty