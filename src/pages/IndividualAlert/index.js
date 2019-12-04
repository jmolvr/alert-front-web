import React from "react";
import Header from "../../components/Header";
import Badge from "../../components/Badge";
import AxiosRequest from "../../services/api";
import './styles.css';
export default class IndividualAlert extends React.Component {
  state = {};

  async componentDidMount() {
    const { handle } = this.props.match.params;
    try {
      const response = await AxiosRequest.getAlert({ id: handle });
      const {
        id,
        latitude,
        longitude,
        descricao,
        status,
        created_at,
        local: { nome },
        owner: { username },
        image
      } = response;
      const tipoNome = response.tipo.nome;
      const data = new Date(created_at).toLocaleString();

      this.setState({
        id: id,
        longitude: longitude,
        latitude: latitude,
        descricao: descricao,
        local: nome,
        tipo: tipoNome,
        status: status,
        owner: username,
        image: image,
        created_at: data
      });
    } catch (err) {
      this.props.history.push("/error404");
    }
  }
  async marcarResolvido(status) {
    const response = await AxiosRequest.putAlert({
      'id': this.state.id,
      'status': status
    })


    this.setState({
      status: response.status
    })
  }

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
                  <button
                    className="btn btn-success"
                    onClick={() => this.marcarResolvido(1)}
                  >
                    Resolvido
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    style={{ marginLeft: "5px" }}
                    onClick={() => this.marcarResolvido(2)}
                  >
                    Não será resolvido
                  </button>
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
        </div>
      </div>
    );
  }
}
