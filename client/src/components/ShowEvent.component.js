import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ShowEvent () {
    const [event, setEvent] = useState('');
    const {eventId} = useParams();

    const getEvent = () =>
        fetch(`http://localhost:5000/api/events/${eventId}`)
            .then((res) => res.json())
    useEffect(() => {

        getEvent().then((event) => setEvent(event))
    });


    return (
        <div>
            <h1>Show {event.title}</h1>

        </div>
    )
}

export default ShowEvent;