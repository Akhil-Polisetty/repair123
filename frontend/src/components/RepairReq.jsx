import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

import "./repairreq.css";

const RepairReq = () => {
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [res_desc, setResDesc] = useState("");
  const [res_cost, setResCost] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  function handleReply(event, emailId) {
    event.preventDefault();
    console.log("entered handle reply");
    setCurrentEmail(emailId);
    setModal2Open(true);
  }

  // async function handleRes(e) {
  //   e.preventDefault();
  //   try {
  //     console.log("the email is ",currentEmail)
  //     setModal2Open(false)
  //     const res = await axios.post("http://localhost:7000/response", {
  //       to: currentEmail,
  //       desc: res_desc,
  //       cost: res_cost,
  //     });
  //     if (res.data) {
  //       if (res.status === 200) {
  //         console.log("inserted into database succesfully");
  //         window.location.reload();
  //       }
  //     } else {
  //       console.log("error at raise 29", res);
  //     }
  //   } catch (err) {
  //     console.log("error at raise 34 ", err);
  //   }
  // }

  async function handleRes(e) {
    e.preventDefault();
    try {
      console.log("the email is ", currentEmail);
      const res = await axios.post("http://localhost:7000/response", {
        to: currentEmail,
        from:users.email_id,
        desc: res_desc,
        cost: res_cost,
      });
      if (res.data) {
        if (res.status === 200) {
          console.log("inserted into database succesfully");
          setModal2Open(false); // Close the modal here
          alert('Response sent Succesfully')
          // window.location.reload();
        }
      } else {
        console.log("error at raise 29", res);
      }
    } catch (err) {
      console.log("error at raise 34 ", err);
    }
  }

  const [users, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/getUsering")
      .then((users) => setUser(users.data))
      .catch((err) => console.log(err));
  }, []);

  
  useEffect(() => {
    axios
      .get("http://localhost:7000/repair")
      .then((repairs) => setRepairs(repairs.data))
      .catch((err) => console.log("the error is at repair 14 ", err));
  }, []);

  return (
    <div style={{ position: "relative", top: "65px" }}>
      {repairs.map((user) => {
        return (
          <div
            key={user._id}
            className="rep_box"
            style={{
              border: "1px solid black",
              zIndex: "1",
              marginTop: "10px",
              backgroundColor: "rgba(255,255,255,0.13)",
              backdropFilter: "blur(2px)",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1
              style={{
                color: "white",
                marginLeft: "100px",
                marginBottom: "10px",
              }}
            >
              Repair Issue
            </h1>
            <p className="req_data">
              <span style={{ color: "darkolivegreen", fontWeight: "bold" }}>
                Username
              </span>{" "}
              : {user.rname}
            </p>
            <p className="req_data">
              <span style={{ color: "darkolivegreen", fontWeight: "bold" }}>
                Appliance
              </span>{" "}
              : {user.rappliance}
            </p>
            <p className="req_data">
              <span style={{ color: "darkolivegreen", fontWeight: "bold" }}>
                Model
              </span>{" "}
              : {user.rmodel}
            </p>
            <p className="req_data">
              <span style={{ color: "darkolivegreen", fontWeight: "bold" }}>
                Repair Description
              </span>{" "}
              : {user.rdesc}
            </p>
            <p className="req_data">
              <span style={{ color: "darkolivegreen", fontWeight: "bold" }}>
                Address
              </span>{" "}
              : {user.raddress}
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={(event) => {
                  console.log("user.remail_id:", user.remail_id);
                  handleReply(event, user.remail_id);
                }}
              >
                Reply
              </Button>
              <Modal
                title="Repair Response"
                centered
                open={modal2Open}
                onOk={handleRes}
                onCancel={() => setModal2Open(false)}
                style={{ backgroundColor: "yellow" }}
              >
                <div>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <input
                      onChange={(event) => setResDesc(event.target.value)}
                      type="text"
                      placeholder="Solution Description"
                      style={{
                        backgroundColor: "black",
                        border: "2px solid green",
                        color: "white",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    />
                    <input
                      onChange={(event) => setResCost(event.target.value)}
                      type="text"
                      placeholder="Cost Estimated"
                      style={{
                        backgroundColor: "black",
                        border: "2px solid green",
                        color: "white",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    />
                    <input
                      type="date"
                      name=""
                      id=""
                      placeholder="Estimated Days"
                      style={{
                        backgroundColor: "black",
                        border: "2px solid green",
                        color: "white",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  </form>
                </div>
              </Modal>
              <button
                style={{
                  width: "60px",
                  padding: "3px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "red",
                }}
              >
                Ignore
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepairReq;
