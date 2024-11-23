import { Link, useNavigate, useLocation } from "react-router-dom"
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)

  async function signOutUser () {
    try {
      setIsUserSignedIn(false)
      // sign out user and navigate to Homepage
      await signOut(auth)
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(auth.currentUser && location.pathname === "/displaced") {
      setIsUserSignedIn(true)
    }
  }, [location.pathname])

  return(
      <header>
          <nav>
            <ul className='nav-list'>
              <li className='nav-item'><Link to="/">Home</Link></li>
              <li className='nav-item'><Link to="/displaced">Displaced Persons</Link></li>
              <li className='nav-item'><Link to="/about">About</Link></li>
            </ul>
            <ul className="nav-list">
              {!isUserSignedIn ?       
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