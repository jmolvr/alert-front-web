import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  ButtonToolbar,
  InputGroup,
  Col
} from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
import { format } from "date-fns";
import AxiosRequest from "../../services/api";

export default function Details(props) {
  let { feedback, prazo, status } = props;
  if (prazo !== null) prazo = new Date(prazo);
  let [textArea, setTextArea] = useState(feedback);
  const [estadoToggle, setToggle] = useState(status);
  const [prazodt, setPrazo] = useState(prazo);

  useEffect(() => {
    registerLocale("pt", pt);
  });

  const handleSubmit = async event => {
    event.preventDefault();
    if (textArea === "") textArea = null;

    const prazoISO = prazodt !== null ? format(prazodt, "yyyy-MM-dd") : null;
    await AxiosRequest.putAlert({
      id: props.id,
      feedback: textArea,
      prazo: prazoISO,
      status: estadoToggle
    });

    props.getAlert();
    props.handleClose();
  };


  return (
    <Modal show={true} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={textArea}
              onChange={e => {
                setTextArea(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Prazo</Form.Label>
              <InputGroup>
                <DatePicker
                  className="form-control"
                  type="date"
                  dateFormat="dd/MM/yyyy"
                  selected={prazodt}
                  onChange={setPrazo}
                  isClearable
                  placeholderText="Adicione um prazo"
                  locale="pt"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Estado</Form.Label>
              <ButtonToolbar>
                <ToggleButtonGroup
                  value={estadoToggle}
                  name="status"
                  onChange={val => setToggle(val)}
                >
                  <ToggleButton value={0}>Aberto</ToggleButton>
                  <ToggleButton value={1}>Fechado</ToggleButton>
                  <ToggleButton value={2}>Arquivado</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar Mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
