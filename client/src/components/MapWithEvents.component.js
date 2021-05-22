import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import {Link} from "react-router-dom";
import convertData from "../libs/libs";


//Displays map with events as markers and popups.
const MapWithEvents = ({events}) => {
    return (
            <MapContainer center={{ lat: 52.20, lng: 19.20}} zoom={7} style={{width: "50rem", height: "50rem"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.length !== 0 ? events.map(event =>
                    <Marker key={event._id} position={[event.location.latitude, event.location.longitude]}>
                        <Popup>
                            {convertData(event.day)} {event.time}
                            <br/>
                            <Link to={location => `${location.pathname}/${event._id}`} >{event.title}</Link>
                        </Popup>
                    </Marker>
                ) : null }
            </MapContainer>
        )
}

export default MapWithEvents;