import React from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function VisitsTableData(props) {
  return (
    <>
        <tr key={props.visitor.id}>
          <td>{props.visitor.firstname}</td>
          <td>{props.visitor.lastname}</td>
          <td>{props.visitor.company}</td>
          <td>{props.visitor.reason.reasonName}</td>
          <td>{props.visitor.encouteredPerson.firstname} {props.visitor.encouteredPerson.lastname}</td>
          <td>{dayjs(props.visitor.entranceDate).format('DD/MM/YY HH:mm')}</td>
          <td><button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sortie</button></td>
        </tr>
      </>
  );

  function handleClick(e) {
    e.preventDefault();
    console.log(props.visitor);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newVisit = {
      leavingDate: dayjs(),
    };
    console.log(newVisit);
    axios
      .put(`http://127.0.0.1:8000/api/visits/${props.visitor.id}`, newVisit)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
}
