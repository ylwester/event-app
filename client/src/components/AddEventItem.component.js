import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import "../styles/addEventForm.css";
import { useEffect } from "react";

import useVisibilityChange from "./VisibilityChange";

function getTodayDateToInput() {
  let tempDate = new Date();
  let dd = tempDate.getDate();
  let mm = tempDate.getMonth() + 1;
  let yyyy = tempDate.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
}

const AddEventItem = () => {

    useEffect(() =>
        document.getElementById("when").setAttribute("min", getTodayDateToInput())
    );


    const [priceComponent, setPriceVisibility] = useVisibilityChange(
      <FormGroup row className="border-bottom">
          <Label sm={2}>
              Cena
          </Label>
          <Col sm={8}>
              <Input type="input" id="price" />
          </Col>

      </FormGroup>,
      false
    );

  return (
    <Container className="add-event-form">
      <h1>Dodaj nowe wydarzenie</h1>
      <Container>
        <Form>
          <FormGroup className="border-bottom" row>
            <Label for="title" sm={2}>
              Tytuł
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                className="form-control"
                name="title"
                id="title"
              />
            </Col>
          </FormGroup>
          <FormGroup row className="border-bottom">
            <Label for="description" sm={2}>
              Opis
            </Label>
            <Col sm={8}>
              <Input
                type="textarea"
                style={{ minHeight: "80px", height: "150px" }}
                name="description"
                id="description"
                placeholder="Opis wydarzenia"
              />
            </Col>
          </FormGroup>
          <FormGroup row className="border-bottom">
            <Label for="when" sm={2}>
              Kiedy?
            </Label>
            <Col sm={8}>
              <Input type="date" id="when" />
            </Col>
          </FormGroup>
          <FormGroup row className="border-bottom">
            <Label for="time" sm={2}>
              Czas
            </Label>
            <Col sm={8}>
              <Input type="time" id="time" />
            </Col>
          </FormGroup>
          <FormGroup check inline className="border-bottom" >
              <Input type="checkbox" id="dupa" onClick={() => setPriceVisibility()} /> Płatne
          </FormGroup>
          {priceComponent}
        </Form>

      </Container>
    </Container>
  );
};


export default AddEventItem;
