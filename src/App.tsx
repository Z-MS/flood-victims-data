import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import './styles/bulma_override.scss'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'
import { useEffect, useState } from 'react'
import useDisplacedPersonsStore from './stores/displacedPersons'

function App() {
  const location = useLocation()
  const [onHomepage, setOnHomepage] = useState<boolean>(location.pathname === '/')
  const {fetchDisplacedPersons, displacedDataLoading, totalDisplacedCount, numberOfChildren, totalFemalesCount, numberOfWidows, numberOfDivorcees} = useDisplacedPersonsStore() 

  useEffect(() => {
    // fetch data from Firebase
    fetchDisplacedPersons()
  }, [])

  useEffect(() => {
    if(location.pathname === "/") {
      setOnHomepage(true)
    } else {
      setOnHomepage(false)
    }
  },[location.pathname])


  return (
    <>
        <Navbar/>
        <main data-theme="light">
          <Outlet/>
          {
            onHomepage && (
              <>
          <div id='title'>
            <h1>Maiduguri Flood Victims Data Capture</h1>
          </div>
          <p>Last updated: </p>
          {
            displacedDataLoading && (
              <p>Calculating...</p>
            )
          }
          <div id='data-container'>
            <StatCard title="Total Number of Displaced Persons" stats={totalDisplacedCount}/>
            <StatCard title="Children" stats={numberOfChildren}/>

            <StatCard title="Women and girls" stats={totalFemalesCount}>
              <p className='stat-title'>Widows - <span className='number'>{numberOfWidows}</span></p>
              <p className='stat-title'>Divorcees - <span className='number'>{numberOfDivorcees}</span></p>
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
