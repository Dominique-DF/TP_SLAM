import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import axios from "axios";

export default function NewVisits() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [reasons, setReasons] = useState([]); 
  
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
    axios.get("http://127.0.0.1:8000/api/reasons", config).then(
      (response) => {
        setIsLoaded(true);
        const reasons = response.data["hydra:member"];
        console.log(reasons);
        setReasons(reasons);
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
      <Navbar current="newvisit" />
      <form className="m-20">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-lg font-bold pb-10">
              Saisie d'une nouvelle visite
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prénom
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="employees"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Personne rencontrée
                </label>
                <div className="mt-2">
                  <select
                    id="employees"
                    name="employees"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {employees.map((employee) => (
                      <option>{employee.firstname} {employee.lastname}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Motif de la visite
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {reasons.map((reason) => (
                      <option>{reason.reasonName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <a href="/visits">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-orange-500 rounded-md px-3 py-2"
            >
              Annuler
            </button>
          </a>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </>
  );
                    }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
  }
}
