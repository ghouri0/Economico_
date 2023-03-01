import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import toast, { Toaster } from 'react-hot-toast';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../complainTable/table.css"
import { Link } from "react-router-dom";
import { useState } from "react";



export default function Table2(props) {
  const [complains, setComplains] = useState([])
  const[haveComplain, setHaveComplain] = useState(false)
  const [urls, seturls] = useState([]);
  async function getComplains(){
    await fetch(urls, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        if(data.length === 0)
        {
          setHaveComplain(false);
        }
        else{
          setHaveComplain(true);
          setComplains(data);
        }
          
      });
  }
  

  useEffect(()=>{
    if (props.user === "customer") {
      seturls(`/getcomplaint`);
    }
    else {
      seturls(`/getsellercomplaint`);
    }
    getComplains()
  })


  return (
    <div style={{ height: '600px', width: "100%"}}>
      {(haveComplain)?(<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            "& th": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        > 
          <TableRow>
            <TableCell className="tableCell">Subject</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {complains.map((row) =>
              <TableRow key={row._id}>
                <TableCell className="tableCell" component="th" scope="row">
                  {row.subject}
                </TableCell>
                <TableCell className="tableCell">{row.description}</TableCell>
                <TableCell className="status">{row.order_id}</TableCell>
                <TableCell className="status">{row.customer_email}</TableCell>
                <TableCell className="status">{row.status}</TableCell>
                <TableCell className="tableCell">
                </TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>):(<div style={{
      display: "flex",
      alignItems: "center",
      justifyContent:"space-between",
      flexDirection: "column",
    }}>
      <img
        src="https://icon-library.com/images/complaint-icon/complaint-icon-27.jpg"
        alt="EmptyComplain"
        style={{ width: "300px", height: "320px" }}
      />
      <h4 style={{ color: "grey", fontWeight: "bold" }}>
        there is no complain to view !!
      </h4>
      <h3 style={{ color: "grey" }}>Go and Explore Products</h3>
      <Link to="/">
        <a href="#" target="_blank" rel="noopener noreferrer" class="btn">
          <KeyboardBackspaceIcon /> Shop Now
        </a>
      </Link>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: '#1e68c9',
            padding: '5px',
            color: 'white',
            width: '250px',
            height: '40px',
            left: 15,
            top: 1000
          },
        }}
      />
    </div>)
    }
      
    </div>
  );
}
