import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'
import { useEffect, useState } from 'react'
import { DisplacedPerson } from './components/Displaced/displacedPerson'
import useDisplacedPersonsStore from './stores/displacedPersons'

function App() {
  const location = useLocation()
  const [onHomepage, setOnHomepage] = useState<boolean>(location.pathname === '/')
  const displacedPersons = useDisplacedPersonsStore((state: any) => state.displacedPersons)
  const fetchDisplacedPersons = useDisplacedPersonsStore((state: any) => state.fetchDisplacedPersons)
  
  const [totalDisplacedCount, setTotalDisplacedCount] = useState<number>(0)
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0)
  const [femalesCount, setFemalesCount] = useState({ total: 0, widows: 0, divorcees: 0 })

  function getStats() {
    setTotalDisplacedCount(displacedPersons.length)
    setNumberOfChildren(() => {
      let count = 0
      displacedPersons.forEach((person: DisplacedPerson) => {
        if(person.age < 13) {
          count++
        }
      })
      return count
    })

    setFemalesCount(() => {
      let totalFemalesCount = 0, divorceesCount = 0, widowsCount = 0
      displacedPersons.forEach((person: DisplacedPerson) => {
        if(person.gender === 'Female')
          totalFemalesCount++
        if(person.maritalStatus === 'Divorced')
          divorceesCount++
        if(person.maritalStatus === 'Widowed')
          widowsCount++
      })
      return { total: totalFemalesCount, divorcees: divorceesCount, widows: widowsCount }
    })
  }

  useEffect(() => {
    fetchDisplacedPersons()
    getStats()
  })

  useEffect(() => {
    if(location.pathname === "/") {
      setOnHomepage(true)
      fetchDisplacedPersons()
      getStats()
    } else {
      setOnHomepage(false)
    }
  },[location.pathname])

  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
          {
            onHomepage && (
              <>
          <div id='title'>
            <h1>Maiduguri Flood Victims Data Capture</h1>
          </div>
          <p>Last updated: </p>

          <div id='data-container'>
            <StatCard title="Total Number of Displaced Persons" stats={totalDisplacedCount}/>
            <StatCard title="Children" stats={numberOfChildren}/>

            <StatCard title="Women and girls" stats={femalesCount.total}>
              <p className='stat-title'>Widows - <span className='number'>{femalesCount.widows}</span></p>
              <p className='stat-title'>Divorcees - <span className='number'>{femalesCount.divorcees}</span></p>
            </StatCard>
          </div>
              </>
            )
          }
        </main>
    </>
  )
}

export default App
