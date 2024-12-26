import '../styles/Footer.css';
import logo from '../assets/logo.jpg';
import { NavLink } from "react-router-dom";

function Footer() {
    const today = new Date();
    return (
        <footer>
            <nav id='footer-nav'>
            <div id="footer-logo-container">
                <NavLink id="logo" to="/"><img src={logo} width={30} height={30}/></NavLink>
            </div>
              <ul id='footer-nav-list'>
                <li className='nav-item'><NavLink className='nav-link' to="/">Home</NavLink></li>
                <li id='displaced-link-item' className='nav-item'><NavLink className='nav-link' to="/displaced">Displaced Persons</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/about">About</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/about">Contact</NavLink></li>
              </ul>
            </nav>
            <p id='footer-copyright'><span>{today.getFullYear()}</span> Swift Relief Foundation</p>
        </footer>
    )
}

export default Footer;