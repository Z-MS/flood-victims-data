import { Outlet, useLocation, NavLink } from 'react-router-dom'
import './App.css'
import './styles/bulma_override.scss'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'
import { useEffect, useState } from 'react'
import useDisplacedPersonsStore from './stores/displacedPersons'
import Footer from './components/Footer'

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
          <div className="container">
            <Outlet/>
          </div>
          {
            onHomepage && (
              <>
                <section>
                  <div id='hero' className='overlay'>
                    <div id='title'>
                      <h1>Swift Relief Foundation</h1>
                      <p id="subtitle">Maiduguri Flood Victims Data Capture</p>
                      <div className='button-links'>
                        <span id="stats-link-button" className='button-link'><NavLink to="/">View the Statistics</NavLink></span>
                        <span id="project-link-button" className='button-link'><NavLink to="/">Learn About the Project</NavLink></span>
                      </div>
                    </div>
                  </div>
                </section>

                <main data-theme="light">
                  <section id='stats-section'>
                    <h2 className='section-title'>Statistics</h2>
                    {
                      displacedDataLoading && (
                        <p>Calculating...</p>
                      )
                    }

                    <div id='data-container' className='container'>
                      <StatCard title="Total Number of Displaced Persons" stats={totalDisplacedCount}/>
                      <StatCard title="Children" stats={numberOfChildren}/>

                      <StatCard title="Women and girls" stats={totalFemalesCount}>
                      </StatCard>
                      <StatCard title="Widows" stats={numberOfWidows}>
                      </StatCard>
                      <StatCard title="Divorcees" stats={numberOfDivorcees}>
                      </StatCard>
                    </div>
                  </section>
                </main>
            </>
            )
          }
        <Footer/>
    </>
  )
}

export default App
