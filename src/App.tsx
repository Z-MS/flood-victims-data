import './App.css'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'

function App() {

  return (
    <>
        <Navbar/>
        <main>
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
        </main>
    </>
  )
}

export default App
