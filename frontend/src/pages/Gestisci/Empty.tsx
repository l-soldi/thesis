import React from 'react'
import { useNavigate } from 'react-router-dom'

const Empty = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/prenota')
    }
    
  return (<>
    <h2>Non hai prenotazioni</h2>
    <button onClick={handleClick}>Prenota subito</button>
  </>
  )
}

export default Empty