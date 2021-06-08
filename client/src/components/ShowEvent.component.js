import { useParams } from "react-router-dom";
import React, {useContext, useState} from "react";
import {Container} from "reactstrap";
import convertData from "../libs/libs"
import {EventContext} from "../App";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import './../styles/showEvent.css';

function ShowEvent() {
    const [events] = useContext(EventContext);
    const { eventId } = useParams();
  const [event, setEvent] = useState(()=> {
      const result = events.filter(event => event._id === eventId);
      return result[0];
  });

  let createdAt = new Date(event.createdAt)

  return (
    <Container className="themed-container" fluid="lg">
            <div>
                <div className="show-container">
                    <div>
                        <h4>{event.title}</h4>
                    </div>
                    <div>
                        <p style={{margin: 0, fontSize: "0.9rem"}}>Dodane przez: {event.author}, dnia {createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                <h5>Opis</h5>
                <div className="show-container">
                    <span style={{whiteSpace: "pre-wrap"}}>{event.description}</span>
                </div>
                <h5>Szczegóły</h5>
                <div className="show-container details">
                    <div style={{width: "50%"}}>
                        <p>Data: {convertData(event.day)}</p>
                        <p style={{marginBottom: 0}}>Godzina: {event.time ? event.time : null}</p>
                    </div>
                    <div style={{width: "50%"}}>
                        <p>Ulica: {event.street}</p>
                        <p style={{marginBottom: 0}}>Miasto: {event.city}</p>
                    </div>
                </div>
                <h5>Lokalizacja</h5>
                <div className="show-container" style={{height: "200px", marginBottom: "10px"}}>
                        <MapContainer center={{lat: event.location.latitude, lng: event.location.longitude}}
                                      zoom={13} style={{width: "100%", height: "100%"}}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker key={event._id} position={[event.location.latitude, event.location.longitude]}>
                                <Popup>
                                    {event.title}
                                </Popup>
                            </Marker>
                        </MapContainer>
                </div>
            </div>

  </Container>
)}

export default ShowEvent;
