import React from "react";
import Table2 from "../Seller/complainTable/Table2";

export default function Complain(props) {
  return (
    <div>
      <div
        className="titleContainer"
        style={{ width: "98%", height: "max-content", margin: "15px" }}
      >
        <div className="title" style={{color: 'grey'}}>Complains</div>
        <Table2 user={props.user} /> 
      </div>
    </div>
  );
}
