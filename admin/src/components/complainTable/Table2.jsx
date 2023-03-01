import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../table/table.css";
import { useState } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import { Button } from "@mui/material";


export default function Table2() {
  const navigate = useNavigate();
  const param = useParams();
  const [complains, setComplains] = useState([])
  const [valid, setValid] = useState(true);
  async function getComplains(){
    await fetch("/getadmincomplaint", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
          setComplains(data);
      });
  }

  useEffect(()=>{
    getComplains()
  })


  return (
    <div style={{ height: '600px', width: "100%"}}>
      <TableContainer component={Paper}>
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
            <TableCell className="tableCell">Seller</TableCell>
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
                <TableCell className="status">{row.seller_email}</TableCell>
                <TableCell className="tableCell">
                <button
                    onClick={() => {
                      navigate("/viewcomplain", {
                        state: {
                          customerEmail: row.customer_email,
                          orderid: row.order_id,
                          sellerEmail: row.seller_email,
                          subject: row.subject,
                          description : row.description,
                          status: row.status,
                          id: row._id
                        },
                      });
                    }}
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "100%",
                      height: "35px",
                      padding: "5px",
                      margin: "auto",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    View 
                  </button>
                </TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
