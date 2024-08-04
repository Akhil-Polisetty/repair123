import React from "react";
import './contact.css'

import { FiPhoneCall } from "react-icons/fi";
import { FaRocketchat } from "react-icons/fa6";
const Contact = () => {
  return (
    <div>
      <nav>
        <div class="container">
          <img src="https://th.bing.com/th/id/OIP.V4Nidu7H1_91E0TeJ3zETQHaHa?w=165&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
          <input type="checkbox" id="showNav" />
          <label for="showNav" id="toggleNav">
            <i class="fas fa-bars"></i>
          </label>
          <ul>
            <li>
              <a href="*" class="active">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/services">Services</a>
            </li> */}
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div>
      <div className='body bodyover'>
      <div className='part1'>
        <p className='part1text'>
          Contact Us if you have any queries related to our website
        </p>
      </div>
      <div className='part2'>

        <div className="side1">
          <div className="side1box">
            <br />
          <div>
            <h1 className='heading'>Lets connect</h1>
            <br />
            <h3 className="heading">Feel Free to express your Thoughts</h3>
          </div>
          <br />
          <br />
          <br />
          <div className="textbox1">

            <div className="col1">
              <h6>First Name</h6>
              <input type="text" color= "black" className = "inputbox inpt"/>
            </div>
            <div className="col1">
              <h6>LastName Name</h6>
              <input type="text" color= "#f9f9f7" className='inputbox inpt' />
            </div>
          </div>
          <br />
          <div className="textbox">
            <h6>Email</h6>
            <div className="inputbox2">
            <input type="text" className='inputbox2 inpt' />
            </div>
          </div>
          <br />
          <div className="textbox ">
            <h6>Tell Us About YourSelf</h6>
            <div className="inputbox2">
            <textarea name="desc" id="textarea" cols="70" rows="10" className="inpt"></textarea>
            </div>
          </div>
          <br />
          <div className="submitbtncls">

          <button type="submit" className='submitbtn'>Submit</button>
          </div>

        </div>
                    
        </div>
        <div className="side2">
          <div className="box">
            <div className="logo"><FiPhoneCall color = "" size="45px" /></div>
            <div className="boxtext">
              <h3>Call Us directly at</h3>
              <br />
              <h2>+234349876</h2>
            </div>

          </div>
          <div className="box">
            <div className="logo"><FaRocketchat color = "" size="45px" /></div>
            <div className="boxtext">
              <h3>Call Us directly at</h3>
              <br />
              <h2>+234349876</h2>
            </div>

          </div>

        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Contact;
