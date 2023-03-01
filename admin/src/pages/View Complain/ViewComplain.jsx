import React, { useState } from "react";
import "./complain.css";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewComplain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState([])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const eventhandler = async (id) => {
    
      try {
        const { data } = await axios.put(`/updateadmincomplaint/${id}`, status);
        alert(data.message);
        navigate('/complain');
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          alert(error.response.data.message);
        }
      }
    };


  const deletehandler = async (id) => {
    try {
      const { data } = await axios.delete(`/deladmincomplaint/${id}`);
      alert(data.message)
      navigate('/complain');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert(error.response.data.message);
      }
    }
  };



  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <div
        className="titleContainer"
        style={{ width: "98%", backgroundColor: "white" }}
      >
        <h1
          style={{
            alignItems: "center",
            fontSize: "35px",
            fontWeight: "bold",
            color: "black",
            justifyContent: "center",
            margin: "auto",
          }}>
          View Complain

        </h1>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={8}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>

            <label className="label">
              Customer Email : <p className="p">{location.state.customerEmail}</p>
            </label>
            <label className="label">
              Complain OrderID : <p className="p">{location.state.orderid}</p>
            </label>


          </div>
        </Stack>
      </div>
      <div
        className="titleContainer"
        id="title"
        style={{
          width: "98%",
          backgroundColor: "white",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <label className="label">
          Seller Email : <p className="p">{location.state.sellerEmail}</p>
        </label>

        <label className="label">
          Subject : <p className="p">{location.state.subject}</p>
        </label>

        <label className="label">
          Description : <p className="p">{location.state.description}</p>
        </label>

        <label className="label">
          Status : <p className="p">{location.state.status}</p>
        </label>
        <div
          style={{
            height: "100px",
            width: "18%",
            display: "flex",
            alignSelf: "flex-end",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <button
            onClick={() => {
              if(location.state.status === "try to solve")
              {
                alert("already saved")
                navigate('/complain');
              }
              else
              {
              setStatus("try to solve");
              eventhandler(location.state.id)
              }
            }}
            style={{
              backgroundColor: "goldenrod",
              border: "none",
              borderRadius: "5px",
              color: "white",
              width: "48%",
              height: "40px",
              padding: "5px",
              margin: "auto",
              fontSize: "12px",
              fontWeight: "bold",
              alignItems: "flex-end",
              cursor: "pointer"
            }}>
            solve
          </button>

          <button
            onClick={() => {
              deletehandler(location.state.id)
            }}
            style={{
              backgroundColor: "red",
              border: "none",
              borderRadius: "5px",
              color: "white",
              width: "48%",
              height: "40px",
              padding: "5px",
              margin: "auto",
              fontSize: "12px",
              fontWeight: "bold",
              alignItems: "flex-end",
              cursor: "pointer"
            }}>
            Delete
          </button>
        </div>




        {/* <h3 style={{ fontWeight: "bold", fontSize: "25px" }}>
          <Link to="">Reset Password</Link>
        </h3> */}
      </div>

    </div>
  );
}
