import '../styles/About.css'
import { NavLink } from "react-router-dom"

export default function About() {
    return (
        <div>
            <section id="about-section">
                <h2 className='section-title'>About the Project</h2>
                <p>This is a data collection project for the 2024 Maiduguri flood victims. The project is sponsored by Swift Relief Foundation.</p>
            </section>

            <section id="contact">
                <h2 className='section-title'>Contact us</h2>
                <p>Office Address: N1 Circular Road Off Shehu Bukar Street, Old GRA Maiduguri</p>
                <p>Phone numbers: 08165500018, 08030640193</p>
                <ul>
                    <li><NavLink to="facebook.com/swiftrelieffoundation">Facebook</NavLink></li>
                    <li><NavLink to="https://x.com/swift_relief_f">X</NavLink></li>
                    <li><NavLink to="https://www.instagram.com/swift_relief_foundation_/?hl=en">Instagram</NavLink></li>
                </ul>
            </section>
        </div>
    )
}