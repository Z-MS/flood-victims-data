import '../styles/Navbar.css'
import cancelIcon from '../assets/cancel-close-svgrepo-com.svg'
import logo from '../assets/logo.jpg'
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import useAuthenticationStore from '../stores/auth'
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"
import { useEffect, useRef } from "react"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isUserSignedIn, setSignIn, authStateLoading } = useAuthenticationStore()
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
      // setIsUserSignedIn(false)
      // sign out user and navigate to Homepage
      await signOut(auth)
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setSignIn()
  }, [location.pathname])

  return(
      <header>
          <button ref={navToggle} onClick={toggleNavbar} className="nav-toggle" aria-label="open navigation" aria-controls="nav-list" aria-expanded="false">
            <span className="hamburger"></span>
            <span className="close"><img src={cancelIcon} width={20} height={20}/></span>
          </button>
          <div id="logo-container">
            <NavLink id="logo" to="/"><img src={logo} width={30} height={30}/></NavLink>
          </div>
          <nav>
            <ul ref={navbar} data-visible="false" className='nav-list'>
              <li className='nav-item'><NavLink className='nav-link' to="/">Home</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to="/displaced">Displaced Persons</NavLink></li>
              <li id='about' className='nav-item'><NavLink className='nav-link' to="/about">About</NavLink></li>
              
              {authStateLoading && <li className='nav-item'>Checking login status...</li>}
              
              {(!authStateLoading && !isUserSignedIn) && (       
              <>
                <li id='signin' className='nav-item'><NavLink className='nav-link' to="/signin">Sign in</NavLink></li>
                <li id='signup' className='nav-item'><NavLink className='nav-link' to="/signup">Sign up</NavLink></li>
              </>)
              }

              {(!authStateLoading && isUserSignedIn) && (
              <>
                <li className='nav-item'><button id='signout-button' onClick={signOutUser}>Sign out</button></li>
              </>)
              }
            </ul>
              
          </nav>
      </header>
    )
}

export default Navbar