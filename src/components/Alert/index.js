import React from "react";
import { Link } from "react-router-dom";

import Badge from "../../components/Badge";

const Alert = props => {
  const url = `/alertas/${props.id}/`;
  return (
    <div className="card" style={{ width: "18rem", margin: "5px" }}>
      <div className="card-header">
        {props.tipo.nome}{" "}
        <Badge status={props.status} style={{ padding: "8px" }} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.local.nome}</h5>
        <p className="card-text">{props.descricao}</p>
        <Link to={url} className="btn btn-primary">
          Abrir
        </Link>
      </div>
    </div>
  );
};

export default Alert;
