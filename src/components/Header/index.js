import React from "react";
import { logout } from "../../services/auth";
import { withRouter } from "react-router-dom";
const Header = props => {
  return (
    <header>
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#6200ee", marginBottom: "20px" }}
      >
        <a className="navbar-brand" href="/">
          Alerta Unifap
        </a>
        <form className="form-inline">
          <button
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={() => {
              logout();
              props.history.push("/");
            }}
          >
            Logout
          </button>
        </form>
      </nav>
    </header>
  );
};

export default withRouter(Header);
