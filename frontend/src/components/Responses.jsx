import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Popconfirm } from "antd";

const Responses = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState({});
  const [acceptPopconfirmVisible, setAcceptPopconfirmVisible] = useState({});
  const [rejectPopconfirmVisible, setRejectPopconfirmVisible] = useState({});
  const [actfrom,setActfrom]=useState('')
  const [rdesc,setRdesc]=useState('')
  const [rcost,setRcost]=useState('')

  const showAcceptPopconfirm = (responseId,respFrom,respDesc,respCost) => {
    setActfrom(respFrom)
    setRdesc(respDesc)
    setRcost(respCost)
    console.log("the email is ",actfrom)
    setAcceptPopconfirmVisible((prevState) => ({
      ...prevState,
      [responseId]: true,
    }));
  };

  const showRejectPopconfirm = (responseId) => {
    setRejectPopconfirmVisible((prevState) => ({
      ...prevState,
      [responseId]: true,
    }));
  };

  const   handleOk = async (responseId) => {
    console.log("clicked")
    try {
      console.log("the email is ",users.email_id)
      const res = await axios.post("http://localhost:7000/postactive", {
        
       user:users.email_id,
       technician:actfrom,
       rsol:rdesc,
       rcost:rcost,
       rlocation:activerepair.rlocation,
       rmodel:activerepair.rmodel,
       raddress:activerepair.raddress,
       rappliance:activerepair.rappliance,
       rdesc:activerepair.rdesc


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
    setConfirmLoading((prevState) => ({
      ...prevState,
      [responseId]: true,
    }));

    setTimeout(() => {
      setAcceptPopconfirmVisible((prevState) => ({
        ...prevState,
        [responseId]: false,
      }));
      setRejectPopconfirmVisible((prevState) => ({
        ...prevState,
        [responseId]: false,
      }));
      setConfirmLoading((prevState) => ({
        ...prevState,
        [responseId]: false,
      }));
    }, 2000);
  };

  const handleCancel = (responseId) => {
    console.log("Clicked cancel button");
    setAcceptPopconfirmVisible((prevState) => ({
      ...prevState,
      [responseId]: false,
    }));
    setRejectPopconfirmVisible((prevState) => ({
      ...prevState,
      [responseId]: false,
    }));
  };

  const [users, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/getUsering")
      .then((users) => setUser(users.data))
      .catch((err) => console.log(err));
  }, []);

  const [activerepair, setActiverepair] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/getactiverepairs")
      .then((activerepair) => setActiverepair(activerepair.data))
      .catch((err) => console.log(err));
  }, []);

  const [repairs, setRepairs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/repair")
      .then((repairs) => setRepairs(repairs.data))
      .catch((err) => console.log("the error is at repair 14 ", err));
  }, []);


  console.log("entered responses client");
  const [responses, setResponse] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/getresponse")
      .then((responses) => setResponse(responses.data))
      .catch((err) => console.log("the error is at repair 14 ", err));
  }, []);
  console.log("succesfully returned after server");
  console.log("the responses data is ", responses);
  return (
    <div>
      {responses.map((resp) => {
        return (
          <div
            key={resp._id}
            className="rep_box"
            style={{
              border: "1px solid black",
              zIndex: "1",
              marginTop: "10px",
              backgroundColor: "rgba(255,255,255,0.24)",
              backdropFilter: "blur(8px)",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color:'white'
            }}
          >
          <h2 style={{textAlign:'center',color:'blue',backgroundColor:'yellowgreen',borderRadius:'4px'}}>Responses for your {} Issue</h2>
            

            <p style={{fontWeight:'bold'}}><span style={{color:'yellow',fontWeight:'bolder'}}>Tech Mail : </span>{resp.from}</p>
            <p style={{fontWeight:'bold'}}><span style={{color:'yellow',fontWeight:'bolder'}}>Solution Suggested : </span>{resp.response_desc}</p>
            <p style={{fontWeight:'bold'}}><span style={{color:'yellow',fontWeight:'bolder'}}>Estimated cost : </span>{resp.res_cost}</p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Popconfirm
                title="Are you sure to accept?"
                visible={acceptPopconfirmVisible[resp._id]}
                onConfirm={() => handleOk(resp._id)}
                okButtonProps={{
                  loading: confirmLoading[resp._id],
                }}
                onCancel={() => handleCancel(resp._id)}
              >
                <Button
                  type="primary"
                  style={{backgroundColor:'green'}}
                  onClick={() => showAcceptPopconfirm(resp._id,resp.from,resp.response_desc,resp.res_cost)}
                >
                  Accept
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Are you sure to reject?"
                visible={rejectPopconfirmVisible[resp._id]}
                onConfirm={() => handleOk(resp._id)}
                okButtonProps={{
                  loading: confirmLoading[resp._id],
                }}
                onCancel={() => handleCancel(resp._id)}
              >
                <Button
                  type="primary"
                  danger
                  onClick={() => showRejectPopconfirm(resp._id)}
                >
                  Reject
                </Button>
              </Popconfirm>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Responses;
