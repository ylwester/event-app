import { useParams } from "react-router-dom";
import React, {useContext, useState} from "react";
import {Container} from "reactstrap";
import convertData from "../libs/libs"
import {EventContext} from "../App";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function ShowEvent() {
    const [events] = useContext(EventContext);
    const { eventId } = useParams();
  const [event, setEvent] = useState(()=> {
      const result = events.filter(event => event._id === eventId);
      return result[0];
  });

  // console.log(event);

  // const [event, setEvent] = useState();

      // useEffect(() => {
      //     const result = events.filter(event => event._id === eventId);
      //     setEvent(result[0]);
      // }, [eventId, events])


  let createdAt = new Date(event.createdAt)


  return (
    <Container className="themed-container" fluid="lg">
            <div>
                <div>
                    <h1>{event.title}</h1>
                </div>
                <div>
                    <p>Dodane przez: {event.author}, dnia {createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                    <span style={{whiteSpace: "pre-wrap"}}>{event.description}</span>
                </div>
                <div>
                    <p>Szczegóły wydarzenia:</p>
                    <p>Ulica: {event.street}</p>
                    <p>Kiedy się odbywa: {convertData(event.day)}{event.time ? ", " + event.time : null}</p>
                </div>
                Lokalizacja:
                <div style={{height: "200px", width: "100%"}}>
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
        {/*<div>*/}
        {/*<div>*/}
        {/*    <h1>{event.title}</h1>*/}
        {/*    {console.log(event.location.latitude)}*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <p>Dodane przez: {event.author}, dnia {createdAt.toLocaleDateString()}</p>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <span style={{whiteSpace: "pre-wrap"}}>{event.description}</span>*/}
        {/*</div>*/}
        {/*<div style={{height: "500px", width: "500px"}}>*/}
        {/*    <MapContainer center={{latitude: event.location.latitude, longitude: event.location.longitude}} zoom={6} style={{width: "100%", height: "100%"}}>*/}
        {/*        <TileLayer*/}
        {/*            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}
        {/*            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
        {/*        />*/}
        {/*            <Marker key={event._id} position={[event.location.latitude, event.location.longitude]}>*/}
        {/*                <Popup>*/}
        {/*                    {convertData(event.day)} {event.time}*/}
        {/*                    <br/>*/}
        {/*                    <Link to={location => `${location.pathname}/${event._id}`} >{event.title}</Link>*/}
        {/*                </Popup>*/}
        {/*            </Marker>*/}
        {/*    </MapContainer>*/}
        {/*</div>*/}
        {/*</div>*/}


  </Container>
)}

export default ShowEvent;
