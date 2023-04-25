import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "components/Navbar";
import jwtDecode from "jwt-decode";

export default function Employees() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  if (!jwtDecode(token).roles.includes("ROLE_ADMIN")) {
    window.location.href = "/visits";
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get("http://127.0.0.1:8000/api/employees", config).then(
      (response) => {
        setIsLoaded(true);
        const employees = response.data["hydra:member"];
        console.log(employees);
        setEmployees(employees);
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
        <Navbar current="employees" />
        <div className="m-10">
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <Navbar current="employees" />
        <div className="m-10">
          <div>Loading...</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar current="employees" />
        <div className="m-10">
          <ul>
            {employees.map((employee) => (
              <li className="pb-2">
                {employee.firstname} {employee.lastname}
              </li>
            ))}
          </ul>
        </div>
        <form className="m-20">
          <h1>Saisie d'un nouvel employé :</h1>
          <div className="sm:col-span-3">
            <label
              htmlFor="firstname"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={newEmployee.firstname}
              autoComplete="givenname"
              className="ml-5 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="lastname"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={newEmployee.lastname}
              autoComplete="name"
              className="ml-5 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
        </form>
      </>
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    axios
      .post("http://127.0.0.1:8000/api/employees", newEmployee)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
  function handleChange(event) {
    event.persist();
    setNewEmployee((newEmployee) => ({
      ...newEmployee,
      [event.target.name]: event.target.value,
    }));
  }
}
