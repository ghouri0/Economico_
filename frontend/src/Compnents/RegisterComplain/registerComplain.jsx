import React from "react";
import styles from "./styles.module.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SubjectIcon from '@mui/icons-material/Subject';
import DescriptionIcon from '@mui/icons-material/Description';

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function RegisterComplain() {
  const [order_id, setOrder_id] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  
  


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/registercomplaint", { order_id, subject, description });
      setMsg(data.message);
      setError("");
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }

  };
  return (
    <div className="formContainer" style={{
      display: "flex",
      flexDirection: "column",
      margin: "15px",
      padding: "15px",
      boxShadow: "-1px -8px 10px -4px rgb(143, 108, 175)",
      borderRadius: "10px"
    }}>
      <div className="image" style={{ margin: "10px", textAlign: "-webkit-center" }} >
        <h1 style={{ marginTop: "40px", width: "40%", display: "flex", fontWeight: "bold" }}>
          <HowToRegOutlinedIcon
            style={{ paddingBottom: "24px", color: "crimson", fontSize: "75px" }}
          />
          Register Complain
        </h1>
      </div>
      <div className="inputs">
        <form action="" style={{ padding: "25px" }}>
          <div className="delInp">
            <AccountBoxOutlinedIcon className="icon2" />
            <TextField
              id="fullwidth"
              label="Order ID"
              placeholder="Order ID"
              onChange={(e) => {
                setOrder_id(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>

          <div className="delInp">
            <SubjectIcon className="icon2" />
            <TextField
              id="outlined-order_id fullwidth"
              label="Subject"
              placeholder="Subject of Complain"
              type="text"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <DescriptionIcon className="icon2" />
            <TextField
              id="outlined-order_id fullwidth"
              label="Description"
              placeholder="Enter Complain Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px"
              }}
            />
          </div>
         <div>{error && <div className={styles.error_msg}>{error}</div>}
          {msg && <div className={styles.success_msg}>{msg}</div>}</div>


          <Button
            onClick={handleRegister}
            variant="contained"
            color="error"
            style={{ marginLeft: "315px", marginTop: "30px", width: "50%", height: "50px" }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
