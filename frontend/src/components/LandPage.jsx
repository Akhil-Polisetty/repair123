import React from 'react'
import './landpage.css'
import { Link } from 'react-router-dom'

const LandPage = () => {
  return (
    <div>
         <nav>
        <div class="container">
                <img src="https://th.bing.com/th/id/OIP.V4Nidu7H1_91E0TeJ3zETQHaHa?w=165&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"/>
                <input type="checkbox" id="showNav"/>
                <label for="showNav" id="toggleNav"><i class="fas fa-bars"></i></label>
            <ul>
                <li><a href="#" class="active">Home</a></li>
                {/* <li><a href="/services">Services</a></li> */}
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section>
        <div class="container">
        <h1>Repair Ease</h1>
        <h3>With Repair, We Pair...</h3>

        
        <Link to="/signin">sign in</Link>
        </div>
    </section>
    </div>
  )
}

export default LandPage