import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import {Link} from "react-router-dom";
import convertData from "../libs/libs";

//Displays map with events as markers and popups.
const MapWithEvents = ({events}) => {
    return (
            <MapContainer center={{ lat: 52.20, lng: 19.20}} zoom={6} style={{width: "100%", height: "100%"}}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>,
                    &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>
                    &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
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