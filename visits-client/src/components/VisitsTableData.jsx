import React from "react";

export default function VisitsTableData(props) {
  return (
    <>
      {props.visitors?.map((visitor, index) => (
        // <li key={index}>{visitor.firstname}</li>
        <tr key={visitor.id}>
          <td>{visitor.firstname}</td>
          <td>{visitor.lastname}</td>
          <td>{visitor.company}</td>
          <td>{visitor.reason}</td>
          <td>{visitor.encouteredPerson}</td>
          <td>{visitor.entranceDate}</td>
        </tr>
      ))}
      </>
  );
}
