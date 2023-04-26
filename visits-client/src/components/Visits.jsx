import React, { useState, useEffect } from "react";
import VisitsTitle from "components/VisitsTitle";
import VisitsTable from "components/VisitsTable";
import axios from "axios";
import Navbar from "components/Navbar";
import jwtDecode from "jwt-decode";

export default function Visits() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get("http://127.0.0.1:8000/api/visits", config).then(
      (response) => {
        setIsLoaded(true);
        const visitors = response.data["hydra:member"];
        console.log(visitors);
        setVisitors(visitors);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  if (error) {
    return (
      <>
        <Navbar current="visits" />
        <div className="m-10">
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Navbar current="visits" />
        <div className="m-10">
          <div>Loading...</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar current="visits" />
        <div className="m-10">
          <VisitsTitle visitorsCount={visitors.length} />
          <VisitsTable visitors={visitors} />
        </div>
      </>
    );
  }
}
