import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button, Alert,
} from "reactstrap";
import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import "../styles/addEventForm.css";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import { Multiselect } from "multiselect-react-dropdown";


import useVisibilityChange from "./VisibilityChange";
import axios from "axios";

import { UserContext } from "../App";


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

  const onClick = () => {
    map.locate();
    map.on("locationfound", (e) => {
      map.flyTo(e.latlng, map.getZoom());
    });
  }

  return (
      <Button onClick={onClick}>Zlokalizuj mnie</Button>
  )
}


const AddEventItem = ({eventCategories}) => {
  const [auth] = useState();
  const [user] = useContext(UserContext);
  const [map, setMap] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [street, setStreet] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({});
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({
    message: null,
    color: '',
  });

  const onDismiss = () => setVisible(false);

  const handleFormError = (err) => {
    setMessage({message: err.response.data.error, color: 'warning'})
    setVisible(true);
  }

  //Reset form inputs state to initial values
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDay('');
    setTime('');
    setStreet('');
    setSelectedCategories({});
    multiselectRef.current.resetSelectedValues();
    setLocation({latitude: 0, longitude: 0});
    document.getElementById("paid").checked = false;
    setPaid(false);
    setPrice('');
    if(priceComponent){
      setPriceVisibility();
    }
  }


  useEffect(() => {
    if(auth) {
      document.getElementById("day").setAttribute("min", getTodayDateToInput());

      if (!paid) document.getElementById("paid").checked = false;
    }
  }, [auth, paid, day])



  const handlePrice = (e) => {
    if(paid){
        setPrice(e.target.value);
    } else {
      e.target.value = null;
    }
  }

  const [priceComponent, setPriceVisibility] = useVisibilityChange(
    <FormGroup row className="border-bottom">
      <Label sm={2}>Cena w zł</Label>
      <Col sm={8}>
        <Input type="number" id="price" step="0.01" value={price} onChange={handlePrice}/>
      </Col>
    </FormGroup>,
    false
  );
  function AddMarker() {
    const [position, setPosition] = useState({latitude: 0, longitude: 0})

    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        setLocation({
          latitude: lat,
          longitude: lng,
        })

      },
    });


    return (
        position.latitude !== 0 ? (
            <Marker position={[position.latitude, position.longitude]} />
        ) : null
    )
  }

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
        <AddMarker/>
      </MapContainer>
    ),
    []
  );

  const multiselectRef = useRef();

  const categoriesSelect = () => {
    const selected = multiselectRef.current.getSelectedItems();
    setSelectedCategories(selected);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!paid){
      setPrice('');
    }

    const event = {
      author: user.name,
      title,
      description,
      day,
      street,
      dayDate: day,
      time,
      location,
      selectedCategories,
      paid,
      price
    }


    axios.post('/api/events/', event)
        .then((res) => {
          setMessage({message: res.data, color: 'success'})
          setVisible(true);
          clearForm();
        })
        .catch(err => handleFormError(err));

  }

  return (
      <div>
      { user.accessToken ?
            <Container className="add-event-form">
              <h3 style={{padding: "10px 0 10px 0"}}>Dodaj nowe wydarzenie</h3>
              <Alert color={message.color} isOpen={visible} toggle={onDismiss}>
                {message.message ? message.message : null}
              </Alert>
              <Container>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="border-bottom" row>
                    <Label for="title" sm={2}>
                      Tytuł
                    </Label>
                    <Col sm={8}>
                      <Input
                          type="text"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          name="title"
                          placeholder="Tytuł"
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
                          style={{minHeight: "80px", height: "150px"}}
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          id="description"
                          placeholder="Opis wydarzenia"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="border-bottom">
                    <Label for="day" sm={2}>
                      Kiedy?
                    </Label>
                    <Col sm={8}>
                      <Input type="date" id="day" value={day} onChange={(e) => {
                        setDay(e.target.value)
                      }}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="border-bottom">
                    <Label for="time" sm={2}>
                      Czas
                    </Label>
                    <Col sm={8}>
                      <Input type="text" id="time" placeholder="HH:mm" pattern='([01]?[0-9]|2[0-3]):[0-5][0-9]'
                             value={time} onChange={(e) => {
                        setTime(e.target.value)
                      }}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="border-bottom">
                    <Label for="street" sm={2}>
                      Adres
                    </Label>
                    <Col sm={8}>
                      <Input type="text" id="street" placeholder="Ulica, numer budynku..."
                             value={street} onChange={(e) => {
                        setStreet(e.target.value);
                      }}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="border-bottom">
                    <Label for="location" sm={2}>
                      Lokalizacja <br/>
                      {map ? <LocalizeMe map={map}/> : null}
                    </Label>
                    <Col sm={8}>{displayMap}</Col>
                  </FormGroup>
                  <FormGroup row className="border-bottom">
                    <Label for="categories" sm={2}>
                      Kategorie
                    </Label>
                    <Col sm={8}>
                      <Multiselect
                          options={eventCategories} // Options to display in the dropdown
                          displayValue="name" // Property name to display in the dropdown options
                          onSelect={categoriesSelect}
                          onRemove={categoriesSelect}
                          selectionLimit="3"
                          ref={multiselectRef}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="border-bottom-last" check inline style={{marginTop: "15px"}}>
                    <Input
                        type="checkbox"
                        id="paid"
                        onChange={() => {
                          setPaid(!paid);
                          setPrice('')
                        }}
                        onClick={() => {
                          setPriceVisibility();
                        }}
                    />{" "}
                    Wydarzenie płatne
                  </FormGroup>
                  {priceComponent}
                  <br/>
                  <Button style={{marginTop: "10px"}}>
                    Dodaj
                  </Button>
                </Form>
              </Container>
            </Container> : <p>Access Denied</p>
      }
      </div>
  );
}

export default AddEventItem;
