import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"

function Navbar() {
  const navigate = useNavigate()

  async function signOutUser () {
    try {
      // sign out user and navigate to Homepage
      await signOut(auth)
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  return(
      <header>
          <nav>
            <ul className='nav-list'>
              <li className='nav-item'><Link to="/">Home</Link></li>
              <li className='nav-item'><Link to="/displaced">Displaced Persons</Link></li>
              <li className='nav-item'><Link to="/">About</Link></li>
            </ul>
            <ul className="nav-list">
              {!auth.currentUser ? 
              <>
                <li className='nav-item'><Link to="/signin">Sign in</Link></li>
                <li className='nav-item'><Link to="/signup">Sign up</Link></li>
              </>:
                <>
                  <li className='nav-item'><button onClick={signOutUser}>Sign out</button></li>
                </>
              }
            </ul>
              
          </nav>
      </header>
    )
}

export default Navbar