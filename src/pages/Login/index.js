import React, { useState } from "react";
import AxiosRequest from "../../services/api";
import { withRouter } from "react-router-dom";

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
    if (!usernameInput || !setPassword) {
      setErrors("Preencha todos os dados (username, password)");
    } else {
      try {
        const response = await AxiosRequest.login({
          user: usernameInput,
          passwd: passwordInput
        });
        props.history.push("/alertas");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
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
