import './style.css'
import DataSelection from './components/DataSelection'
import ExperiencesList from './components/ExperiencesList'
import ReserverData from './components/ReserverData'

const Prenota = () => {
  return (<>
    <div className='container'>
      <DataSelection />
      <ExperiencesList />
    </div>
    <ReserverData />
  </>
  )
}

export default Prenota
