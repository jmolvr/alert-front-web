import React, { useState } from "react";
import AxiosRequest from "../../services/api";
import { login } from '../../services/auth';
import { withRouter } from "react-router-dom";
import logo from './logo.png';
import './style.css';
const Login = props => {
  const [usernameInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [Errors, setErrors] = useState("");
  const handleUsernameChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!usernameInput || !passwordInput) {
      setErrors("Preencha todos os campos.");
    } else {
      try {
        const response = await AxiosRequest.login({
          user: usernameInput,
          passwd: passwordInput
        });
        if (response.access) {
          const { access, refresh } = response;
          login(access, refresh);
        }
        props.history.push("/alertas");
      } catch (err) {
        setErrors("Email ou senha não existem.");
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="text-center">
            <img src={logo}
              alt="Map Alert"
              style={{ width: "100px", margin: "10px 0px 40px" }} />
            {Errors && <p className="border rounded border-danger error">{Errors}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={usernameInput}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={passwordInput}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
