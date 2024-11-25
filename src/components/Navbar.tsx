import '../styles/Navbar.css'
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
          <button className="nav-toggle" aria-label="open navigation">
            <span className="hamburger"></span>
          </button>
          <nav>
            <ul className='nav-list'>
              <li className='nav-item'><Link className='nav-link' to="/">Home</Link></li>
              <li className='nav-item'><Link className='nav-link' to="/displaced">Displaced Persons</Link></li>
              <li id='about' className='nav-item'><Link className='nav-link' to="/about">About</Link></li>
              {!isUserSignedIn ?       
              <>
                <li id='signin' className='nav-item'><Link className='nav-link' to="/signin">Sign in</Link></li>
                <li id="signup" className='nav-item'><Link className='nav-link' to="/signup">Sign up</Link></li>
              </>:
              <>
                <li className='nav-item'><button id='signout-button' onClick={signOutUser}>Sign out</button></li>
              </>
              }
            </ul>
              
          </nav>
      </header>
    )
}

export default Navbar