import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/addEventForm.css";
import { useEffect, useMemo, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

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

function LocalizeMe({ map }) {
  const [position, setPosition] = useState(map.getCenter());

  const onClick = () => {
    map.locate();
    map.on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }

  return (
      <Button onClick={onClick}>Zlokalizuj mnie</Button>
  )
}


const AddEventItem = () => {
  const [map, setMap] = useState(null);
  const [options, setOptions] = useState([
    {
      name: "Koncert",
      id: 1,
    },
    {
      name: "Teatr",
      id: 2,
    },
    {
      name: "Na zewnątrz",
      id: 3,
    },
  ]);

  useEffect(() =>
    document.getElementById("when").setAttribute("min", getTodayDateToInput())
  );

  const [priceComponent, setPriceVisibility] = useVisibilityChange(
    <FormGroup row className="border-bottom">
      <Label sm={2}>Cena w zł</Label>
      <Col sm={8}>
        <Input type="number" id="price" step="0.01" />
      </Col>
    </FormGroup>,
    false
  );

  const displayMap = useMemo(
    () => (
      <MapContainer
        id="location"
        center={[52.229676, 21.012229]}
        zoom={11}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{ height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    ),
    []
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
          <FormGroup row className="border-bottom">
            <Label for="location" sm={2}>
              Lokalizacja <br />
              {map ? <LocalizeMe map={map} /> : null}
            </Label>
            <Col sm={8}>{displayMap}</Col>
          </FormGroup>
          <FormGroup check inline style={{ marginTop: "15px" }}>
            <Input
              type="checkbox"
              id="paid"
              onClick={() => {
                setPriceVisibility();
              }}
            />{" "}
            Wydarzenie płatne
          </FormGroup>
          {priceComponent}
          <FormGroup row className="border-bottom">
            <Label for="categories" sm={2}>
              Kategorie
            </Label>
            <Col sm={8}>
              <Multiselect
                options={options} // Options to display in the dropdown
                displayValue="name" // Property name to display in the dropdown options
              />
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </Container>
  );
};

export default AddEventItem;
