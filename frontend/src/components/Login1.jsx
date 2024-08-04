import React, { useState } from 'react';
import './login1.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import Cookies from 'js-cookie'



// useState


const Login1 = () => {
    const navigate = useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError] = useState('')
    async function handleSubmit(e)
    {   e.preventDefault();
        console.log(email)
        console.log(password)
        if(!email && password){
            setError("Email is are Required!")
        }
        else if(!password && email)
        {
            setError("Password is required")
        }
        else if(!password && !email)
        {
            setError("Email and Password are required")
        }
        else{
        try
        {
            const res=await axios.post('http://localhost:7000/signin',{
                email:email,
                password:password
            });
            if(res.data && res.data.token )
            {
                if(res.status === 200){
                    Cookies.set('token',res.data.token);
                    console.log("Login Successful");
                    // Cookies.set('email',email)
                    navigate('/dashboard')
                }
               else
                {
                    console.log("the response is ",res.data.message)
                    // setError(res.data)
                    // console.log("error is ",error)

                }
                // console.log(res.data.message)
            }
            else
            {
                setError(res.data.message);
            }
        }
        catch(err)
        {
            console.log("error occured at login 37 ")
        }
    }
    }
    return ( 
    <form onSubmit={handleSubmit} className='form_login9'>

        <h3>Login Here</h3>

        {/* <label for="username">Username</label> */}
        <input className='login_input' type="text" placeholder="Email or Phone" id="username" onChange={(event)=>setEmail(event.target.value)}/>

        {/* <label for="password">Password</label> */}
        <input  className='login_input' type="password" placeholder="Password" id="password" onChange={(event)=>setPassword(event.target.value) }/>
        {error && <p style={{color:"red",marginTop:'10px'}}>{error}</p>}
        <button style={{marginTop:"50px"}} type='submit'>Login</button>
        <div style={{marginTop:'20px'}}><p>Don't Have an Account ? <Link to='/signup' className='signup_btn'>Sign Up here</Link></p></div>
    </form>
    )
};
export default Login1;