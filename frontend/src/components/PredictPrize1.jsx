import React, { useEffect, useState } from "react";
// import './predictprice.css'
import "./raiseissue1.css";
// import React from 'react'
import { Button, Modal } from "antd";

const PredictPrize1 = () => {
  const [modal2Open, setModal2Open] = useState(false);

  return (
        <form className="form_login1" style={{height:'500px',color:'white'}} >
        <div>
          <h1 style={{textAlign:'center',marginBottom:"3px"}}>Price Predictor</h1>
            <label htmlFor="app_type">
              Appliance Type : &nbsp;
              <select name="" className="login_input" id="app_type" style={{color:'white'}}>
                <option value="fan" style={{color:'black'}}>fan</option>
                <option value="fridge" style={{color:'black'}}>fridge</option>
                <option value="tv" style={{color:'black'}}>TV</option>
                <option value="sofa" style={{color:'black'}}>Sofa</option>
              </select>
            </label></div>

            <label htmlFor="model">
              Enter Model Details : &nbsp;
              <input className="login_input" type="text" style={{color:'white'}}/>
            </label>
            <label htmlFor="yop">
              Year of Purchase : &nbsp;
              <input className="login_input" type="date" name="" id="yop" style={{color:'white'}} />
            </label>
            <label htmlFor="desc">
              Description about repair : &nbsp;
              <textarea className="login_input" name="" id="desc" cols="30" rows="1" style={{color:'white'}}></textarea>
            </label>
            <div style={{display:"flex",justifyContent:'space-around',marginTop:'10px'}}>
            <Button
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={() => setModal2Open(true)}
                
              >
                Predict
              </Button>
              <Modal
                title="Price"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                style={{ backgroundColor: "yellow" }}
              >
              The Predicted Price is 4000
              </Modal>

            <input type="reset" value="Reset" className="und_btn" /></div>
          </form>
  )
}

export default PredictPrize1