import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./raiseissue1.css";


const RaiseIssue1 = () => {
  // const [remail,setRemail]=useState('')
  const [rname, setRname] = useState("");
  const [rdesc, setRdesc] = useState("");
  const [rlocation, setRlocation] = useState("");
  const [rappliance, setRappliance] = useState("");
  const [rmodel, setRmodel] = useState("");
  const [raddress, setRaddress] = useState("");
  const [users,setUser]=useState([])
  useEffect(()=>{
      axios.get('http://localhost:7000/getUsering')
      .then(users => setUser(users.data))
      .catch(err => console.log(err))
  },[])

  async function handleSub(event) {
    event.preventDefault();
    try {
      console.log("the email is ",users.email_id)
      const res = await axios.post("http://localhost:7000/raising", {
        remail:users.email_id,
        rname: rname,
        rappliance: rappliance,
        rmodel: rmodel,
        rdesc: rdesc,
        rlocation: rlocation,
        raddress: raddress,
      });
      if (res.data) {
        if (res.status === 200) {
          console.log("inserted into database succesfully");
          window.location.reload();
        }
      } else {
        console.log("error at raise 29", res);
      }
    } catch (err) {
      console.log("error at raise 34 ", err);
    }
  }
  return (
    <form
      onSubmit={handleSub}
      className="form_login1"
      style={{ width: "400px", height: "600px", color: "white" }}
    >
      <div className="" style={{ width: "100%" }}>
        <label htmlFor="username">
          Username :{" "}
          <input
            style={{color:'white'}}
            type="text"
            id="username"
            className="login_input"
            onChange={(event) => setRname(event.target.value)}
          />
        </label>

        <label htmlFor="appliance">
          Appliance : &nbsp;
          <select
            id="appliance"
            className="login_input"
            onChange={(event) => setRappliance(event.target.value)}
            style={{ color: "white" }}
          >
            <option value="fan" style={{ color: "black" }}>
              Fan
            </option>
            <option value="fridge" style={{ color: "black" }}>
              Fridge
            </option>
            <option value="washing machine" style={{ color: "black" }}>
              Washing Machine
            </option>
            <option value="TV" style={{ color: "black" }}>
              TV
            </option>
          </select>
        </label>

        <label htmlFor="model">
          Model :{" "}
          <input
          style={{color:'white'}}
            type="text"
            id="model"
            className="login_input"
            onChange={(event) => setRmodel(event.target.value)}
          />
        </label>

        <label htmlFor="description">
          Description about Issue : &nbsp;
          <textarea
          style={{color:'white'}}
            name=""
            id="description"
            cols="30"
            className="login_input"
            rows="1.5"
            onChange={(event) => setRdesc(event.target.value)}
          ></textarea>
        </label>

        <label htmlFor="location">
          Location of Repair : &nbsp;
          <input
          style={{color:'white'}}
            type="text"
            className="login_input"
            id="location"
            onChange={(event) => setRlocation(event.target.value)}
          />
        </label>

        <label htmlFor="address">
          Address : &nbsp;
          <input
          style={{color:'white'}}
            className="login_input"
            type="text"
            id="adress"
            onChange={(event) => setRaddress(event.target.value)}
          />
        </label>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <button className="und_btn" type="submit" placeholder="">
            Raise
          </button>
          <input className="und_btn" placeholder="Reset" type="reset" />
        </div>
      </div>
    </form>
  );
};

export default RaiseIssue1;
