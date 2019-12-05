import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import AxiosRequest from "../../services/api";
import "./index.css";

const Alerts = props => {
  const [alerts, setAlerts] = useState([]);
  const [ws] = useState(new WebSocket("wss://mapalertunifapapi.herokuapp.com/ws/alertas/todos/"));

  useEffect(() => {
    async function carregarAlertas() {
      const response = await AxiosRequest.getAlert();
      setAlerts(response);
    }

    carregarAlertas();

    ws.onopen = e => {
      console.log("Conectou");
    };

    ws.onmessage = e => {
      var data = JSON.parse(e.data);
      setAlerts(data.payload);
    };

    ws.onclose = e => {
      console.log("Conexão fechada!");
    };
    //return funciona como componentWillUnmount
    return () => {
      ws.close();
    }
  }, []);

  //renderização
  return (
    <div>
      <Header />
      <div className="container-fluid d-flex flex-wrap align-content-center">
        {alerts && alerts.map(alert => <Alert key={alert.id} {...alert} />)}
      </div>
    </div>
  );
};

export default Alerts;
