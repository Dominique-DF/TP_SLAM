import React from "react";

export default function VisitsTitle(props) {
  let options = { weekday: "long", month: "long", day: "numeric" };
  let plural = props.visitorsCount > 1 ? "s" : "";
  return (
    <div className="font-sans text-xl text-blue-600 font-bold pb-10">
      {new Date().toLocaleDateString("fr-FR", options)} :{" "}
      {props.visitorsCount === 0 ? "Aucun" : props.visitorsCount} visiteur
      {plural} présent{plural}
    </div>
  );
}
