import React from "react";

const Badge = props => {
  let badgeColor = "badge badge-pill ";
  let text = "";
  if (props.status === 0) {
    badgeColor += "badge-danger";
    text = "Não Resolvido";
  } else if (props.status === 1) {
    badgeColor += "badge-success";
    text = "Resolvido";
  } else if (props.status === 2) {
    badgeColor += "badge-warning";
    text = "Arquivado";
  }

  return (
    <span className={badgeColor} style={props.style}>
      {text}
    </span>
  );
};

export default Badge;
