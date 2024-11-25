import '../styles/Navbar.css'
import cancelIcon from '../assets/cancel-close-svgrepo-com.svg'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"
import { useEffect, useRef, useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)
  const navbar = useRef<HTMLUListElement | null>(null)
  const navToggle = useRef<HTMLButtonElement | null>(null)

  function toggleNavbar() {
    const visibility = navbar.current?.getAttribute('data-visible')
    if(visibility === 'false') {
      navbar.current?.setAttribute('data-visible', 'true')
      navToggle.current?.setAttribute('aria-expanded', 'true')
    } else {
      navbar.current?.setAttribute('data-visible', 'false')
      navToggle.current?.setAttribute('aria-expanded', 'false')
    }
  }

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
          <button ref={navToggle} onClick={toggleNavbar} className="nav-toggle" aria-label="open navigation" aria-controls="nav-list" aria-expanded="false">
            <span className="hamburger"></span>
            <span className="close"><img src={cancelIcon} width={20} height={20}/></span>
          </button>
          <div>
            <p className="logo">FVD</p>
          </div>
          <nav>
            <ul ref={navbar} data-visible="false" className='nav-list'>
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