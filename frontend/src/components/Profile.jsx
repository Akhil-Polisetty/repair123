// import React from "react";
import "./profile.css";
import NavBar from "./NavBar";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './login1.css'


// import './appback.css'

const Profile = () => {

  const navigate=useNavigate()
  const [users,setUser]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:7000/getUsering')
        .then(users => setUser(users.data))
        .catch(err => console.log(err))
    },[])
    console.log("the data is ",users)
    //  async function updateProfile(e)
    // {
    //   e.preventDefault(e);
    //   try
    //   {
    //       const res=await axios.post('http://localhost:7000/update_prof',{
    //           name:"dummy",
    //           email:users.email_id,
    //           phone:"1111111111",
    //           city:"dummycity"
    //       });
    //     }
    //       catch(error)
    //       {
    //           console.log("error occured at signup 44",error)
    //       }
    // }
    // function handleup()
    // {
    //   navigate('/update_profile')
    // }



  return (
    <>
      {/* <NavBar /> */}
      <form className="profile" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      {/* <div>Profile</div> */}
      <div className="profile_head" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      <div>

 <div className="profile_text" style={{fontSize:'28px',fontWeight:'bold'}}>PROFILE</div>
      </div>
    <div style={{display:'flex',flexDirection:'column',gap:'10px',fontFamily:'poppins',fontSize:'larger'}}>
      <div><span className="profile_que">Username :</span> {users.u_name}</div>
      <div><span className="profile_que">Email ID : </span>{users.email_id}</div>
      <div><span className="profile_que">phone : </span>{users.phn_no}</div>
      <div><span className="profile_que">city : </span>{users.city}</div>
     {
      users.tech_stat === 'yes' ? <div><span className="profile_que">Domain : </span>{users.domain}</div> : <></>
     } 
     {
      users.tech_stat === 'yes' ? <div><span className="profile_que">Rating : </span>4.3</div> : <></>
     } 

    </div>
                            {/* <div onClick={handleup} className="update_prof_btn">Update Profile</div> */}
                    
      </div></form>
    </>
  );
};

export default Profile;
