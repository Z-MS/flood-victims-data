import '../styles/Footer.css';
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <nav id='footer-nav'>
              <ul>
                <li className='nav-item'><NavLink className='nav-link' to="/">Home</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/displaced">Displaced Persons</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/about">About</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/contact">Contact</NavLink></li>
              </ul>
            </nav>
        </footer>
    )
}

export default Footer;