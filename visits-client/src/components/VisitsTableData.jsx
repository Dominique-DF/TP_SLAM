import React from "react";

export default function VisitsTableData(props) {
  return (
    <ul>
      {props.visitors?.map((visitor, index) => (
        <li key={index}>{visitor.firstname}</li>
      ))}
    </ul>
  );
}
