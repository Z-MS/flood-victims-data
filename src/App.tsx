import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'

function App() {
  const location = useLocation()
  // fetch displaced people docs, then render the number of stuff on this page
  return (
    <>
        <Navbar/>
        <main>
          <Outlet/>
          {
            location.pathname === '/' && (
              <>
          <div id='title'>
            <h1>Maiduguri Flood Victims Data Capture</h1>
          </div>
          <p>Last updated: </p>

          <div id='data-container'>
            <StatCard title="Total Number of Displaced Persons" stats={70}/>
            <StatCard title="Children" stats={20}/>

            <StatCard title="Women" stats={20}>
              <p className='stat-title'>Widows - <span className='number'>10</span></p>
              <p className='stat-title'>Divorcees - <span className='number'>5</span></p>
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
