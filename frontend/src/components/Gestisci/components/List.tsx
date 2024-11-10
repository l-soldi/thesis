import React, { useCallback, useEffect } from 'react'
import { getReservations } from '../../../api/methods'

const List = () => {
    const [reservations, setReservations] = React.useState([])

    const init = useCallback(async() => {
        const list = await getReservations()
        setReservations(list)
    }, [])
    
    useEffect(() => {
        init()
    }, [init])
  
    return (
    <div>list <br/>
    {reservations.map(elem => <div>{JSON.stringify(elem)}</div>)}
    </div>
  )
}

export default List