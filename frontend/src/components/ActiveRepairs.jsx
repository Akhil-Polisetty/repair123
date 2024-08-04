import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Popconfirm } from "antd";


const ActiveRepairs = () => {
  console.log("entered responses client");
  const [actives, setActives] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/getactiverep")
      .then((actives) => setActives(actives.data))
      .catch((err) => console.log("the error is at repair 14 ", err));
  }, []);
  console.log("succesfully returned after server");
  console.log("the responses data is ", actives);
  return (
    <div>
      {actives.map((act) => {
        return (
          <div
            key={act._id}
            className="rep_box"
            style={{
              border: "1px solid black",
              zIndex: "1",
              marginTop: "10px",
              backgroundColor: "rgba(255,255,255,0.24)",
              backdropFilter: "blur(9px)",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              color:'white'
            }}
          >
          <div style={{borderBottom:'2px solid black',paddingBottom:'8px'}}>
            <h2 style={{textAlign:'center'}}>
              Actors
            </h2>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Client : &nbsp;</span>{act.user}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Technician : &nbsp;</span>{act.technician}</p>
          </div>
          <div  style={{borderBottom:'2px solid black',paddingBottom:'8px'}}>
          <h2 style={{textAlign:'center'}}>
              Issue
            </h2>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Appliance : &nbsp;</span>{act.rappliance}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Model : &nbsp;</span>{act.rmodel}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Problem Description : &nbsp;</span>{act.rdesc}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Location : &nbsp;</span>{act.rlocation}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Address : &nbsp;</span>{act.raddress}</p>
          </div>
            <div >
            <h2 style={{textAlign:'center'}}>
              Solution
            </h2>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Solution : &nbsp;</span>{act.rsolution}</p>
            <p><span style={{color:'green',fontWeight:'bolder'}}>Estimated Cost : &nbsp;</span>{act.rcost}</p>
            </div>
            <div>
            <Button type="primary" style={{backgroundColor:'green'}}>
              Finished
            </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveRepairs;
