import React from "react";

const Welcome = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Bem vindo ao Alerts</h1>
      <p className="lead">
        Um sistema idealizado para que você possa ajudar a UNIFAP se tornar um
        lugar melhor.
      </p>
      <p className="lead">
        <a className="btn btn-outline-primary" href="/login" role="button">
          Login
        </a>
      </p>
    </div>
  );
};

export default Welcome;
