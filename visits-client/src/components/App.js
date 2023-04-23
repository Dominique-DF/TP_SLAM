import "css/App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Visits from "components/Visits";
import NewVisit from "components/NewVisit";
import Login from "components/Login";
import NoMatch from "components/NoMatch";
import Logout from "components/Logout";
import Employees from "./Employees";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route index element={<Visits />} />
        <Route exact path="/visits" element={<Visits />} />
        <Route exact path="/newvisit" element={<NewVisit />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/employees" element={<Employees />} />
        {/* <Route exact path="/reasons" element={<Logout />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
