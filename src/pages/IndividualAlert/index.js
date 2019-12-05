import React from "react";
import Header from "../../components/Header";
import Badge from "../../components/Badge";
import Details from "../../components/Details";
import AxiosRequest from "../../services/api";
import { Button } from "react-bootstrap";

import "./styles.css";
export default class IndividualAlert extends React.Component {
  state = {
    showModal: false
  };

  _getAlert = async () => {
    const { handle } = this.props.match.params;
    try {
      const response = await AxiosRequest.getAlert({
        id: handle
      });

      let {
        prazo,
        created_at,
        feedback,
        local: { nome },
        owner: { username }
      } = response;
      const tipoNome = response.tipo.nome;
      created_at = new Date(created_at).toLocaleString();
      if (feedback == null) feedback = "";
      this.setState({
        id: response.id,
        longitude: response.longitude,
        latitude: response.latitude,
        descricao: response.descricao,
        local: nome,
        tipo: tipoNome,
        status: response.status,
        owner: username,
        image: response.image,
        created_at: created_at,
        prazo: prazo,
        feedback: feedback
      });
    } catch (err) {
      this.props.history.push("/error404");
    }
  };

  componentDidMount() {
    this._getAlert();
  }

  async submitChanges(feedback, status, prazo) {
    const response = await AxiosRequest.putAlert({
      id: this.state.id,
      feedback: feedback,
      prazo: prazo,
      status: status
    });

    this.setState({
      status: response.status
    });
  }

  handleOpen = () => this.setState({ showModal: true });
  handleClose = () => this.setState({ showModal: false });

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">{this.state.local}</div>
            <div className="d-flex flex-wrap card-body">
              <div
                className="container-fluid d-flex flex-column"
                style={{ width: "50%" }}
              >
                <h5 className="card-title">
                  {this.state.tipo} <Badge status={this.state.status} />
                </h5>
                <blockquote className="blockquote mb-0">
                  <p className="card-text">{this.state.descricao}</p>
                  <footer className="blockquote-footer">
                    Criado por {this.state.owner} em {this.state.created_at}
                  </footer>
                </blockquote>
                <div className="h-100 d-flex flex-row align-items-end">
                  <Button onClick={this.handleOpen}>Responder</Button>
                </div>
              </div>
              <div
                className="container-fluid d-flex flex-column justify-content-center align-items-center"
                style={{ width: "50%" }}
              >
                <img
                  className="float-right img-fluid rounded"
                  src={this.state.image}
                  alt="Imagem"
                />
              </div>
            </div>
          </div>
          {this.state.showModal && (
            <Details
              handleClose={this.handleClose}
              showModal={this.state.showModal}
              getAlert={this._getAlert}
              {...this.state}
            />
          )}
        </div>
      </div>
    );
  }
}
