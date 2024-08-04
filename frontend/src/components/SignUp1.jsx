import React, { useState } from "react";
import "./login1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './signup.css'

const SignUp1 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [techstat, setTechstat] = useState("no");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("the value is ",setTechstat)
    if (password !== confpassword) {
      console.log("password does not match");
    } else {
      try {
        const res = await axios.post("http://localhost:7000/register", {
          name: username,
          email: emailId,
          password: password,
          techie:techstat
        });
        if (res.data && res.data.message) {
          console.log(res.data.message, res.status);
          if (res.status === 200) {
            navigate("/signin");
          }
        } else {
          console.log("Error : ", res);
        }
      } catch (error) {
        console.log("error occured at signup 44", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form_login9">
      <h3>Signup Here</h3>
      {/* <label for="username">Username</label> */}
      <input
        className="login_input"
        type="text"
        placeholder="Enter Username"
        id="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      {/* <label for="email">Email</label> */}
      <input
        className="login_input"
        type="email"
        placeholder="Email id"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      {/* <label for="password">Password</label> */}
      <input
        className="login_input"
        type="password"
        placeholder="Password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* <label for="cpassword">Confirm Password</label> */}
      <input
        className="login_input"
        type="password"
        placeholder="confirm password"
        id="cpassword"
        onChange={(event) => setConfPassword(event.target.value)}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input type="radio" id="tech" name="fav_language" onClick={(e)=>setTechstat('yes')}/>
        <label htmlFor="tech">TECH</label>
        <br />
        <input type="radio" id="user" name="fav_language"  onClick={(e)=>setTechstat('no')}/>
        <label htmlFor="user">USER</label>
        <br />
      </div>
      <button style={{ marginTop: "50px" }} type="submit">
        Sign Up
      </button>
      <p style={{ marginTop: "20px" }}>
        Already Have an Account ?
        <a href="/signin" className="signup_btn">
          Login here
        </a>
      </p>
    </form>
  );
};
export default SignUp1;
