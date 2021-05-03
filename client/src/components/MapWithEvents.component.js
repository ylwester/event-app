import {MapContainer, TileLayer} from "react-leaflet";

const MapWithEvents = () => {
    return (
            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={10} style={{width: "50rem", height: "50rem"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        )
}

export default MapWithEvents;