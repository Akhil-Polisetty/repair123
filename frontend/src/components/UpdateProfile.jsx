// import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import React, { useEffect, } from 'react'
import axios from 'axios'
import "./profile.css";
import { Button, Modal, Popconfirm } from "antd";



const UpdateProfile = () => {

    const [users,setUser]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:7000/getUsering')
        .then(users => setUser(users.data))
        .catch(err => console.log(err))
    },[])
    const navigate = useNavigate();
    const [username,setUsername]=useState(users.u_name)
    const [phone,setPhone]=useState(users.phn_no)
    const [city,setCity]=useState(users.city)
    const [domain,setDomain]=useState(users.domain)
    // const [confpassword,setConfPassword]=useState('')
    async function updateProfile(e)
    {
      e.preventDefault(e);
      try
      {
          const res=await axios.post('http://localhost:7000/update_prof',{
              name:username,
              email:users.email_id,
              phone:phone,
              city:city,
              domain:domain
          });
          if(res.status==200)
          {
            window.location.reload();
          }
          else{
            console.log("error occured at updateprofile 37")
          }
        }
          catch(error)
          {
              console.log("error occured at signup 44",error)
          }
    }
  return (
      <form className='form_login1' >
        <div style={{width:'300px',marginTop:'0px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        {/* <div style={{display:'flex'}}> */}
        <label style={{color:'whitesmoke',fontWeight:'bold'}} htmlFor="usernam">Change Username : &nbsp;</label>
           <input type="text"  id='usernam'  className="login_input" placeholder={users.u_name} style={{width:'200px',color:'white',height:'50px'}} onChange={(event)=>setUsername(event.target.value)}/>
        {/* </div> */}
           <label style={{marginTop:'5px',color:'whitesmoke',fontWeight:'bold'}}  htmlFor="phnno">change Phone Number : &nbsp;</label>
            <input type="text" id='phnno'  className="login_input" placeholder={users.phn_no} style={{width:'200px',color:'white',height:'50px'}} onChange={(event)=>setPhone(event.target.value)}/>
            <label style={{marginTop:'5px',color:'whitesmoke',fontWeight:'bold'}} htmlFor="city">City : &nbsp;</label>

            <input type="text" id='city' className="login_input" placeholder={users.city}  style={{width:'200px',color:'white',height:'50px'}} onChange={(event)=>setCity(event.target.value)}/>
            {users.tech_stat === 'yes' ? 
            <label htmlFor="appliance" style={{marginTop:'10px',fontWeight:'bold',color:'white'}}>
              Domain : &nbsp;
              <select id="appliance" className="login_input" onChange={(event)=>setDomain(event.target.value)} style={{color:'white'}}>
                <option value="fan" style={{color:'black'}}>Fan</option>
                <option value="fridge" style={{color:'black'}}>Fridge</option>
                <option value="washing machine" style={{color:'black'}}>Washing Machine</option>
                <option value="TV" style={{color:'black'}}>TV</option>
              </select>
            </label>            :<></> }
{/* 
            <Button style={{margin:'10px 1px'}} type='primary'>
              Change Password 
            </Button> */}
            {/* <input type="password" placeholder='Password' onChange={(event)=>setPassword(event.target.value)}/> */}
            <div className="upd_prf" style={{width:'100px',height:'25px',marginTop:'15px',padding:'3px',cursor:'pointer',borderRadius:'10px'}}  onClick={updateProfile}>Update Profile</div>
</div>
    </form>
  )
}

export default UpdateProfile