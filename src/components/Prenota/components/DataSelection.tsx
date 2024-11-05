import React, { useRef, useState } from 'react'
import { DateInput, Input } from '../../../design-system'

const DataSelection = () => {
  const today = new Date().toString()
  const [date, setDate] = useState(today)
  const numOfPeolple= useRef(null)

  const handlechange = (value: string) => {
    console.log(value)
    setDate(value)
  }

  const handleChangePeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    numOfPeolple.current = e.target.value
  }

  return (
    <section className='side data-selection'>
      <DateInput label='Giorno' value={date.toString()} onChange={handlechange}/>
      <Input type='number' label='Numero di persone' ref={numOfPeolple} onChange={handleChangePeople}  max={6}/>
    </section>
  )
}

export default DataSelection