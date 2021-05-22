import {EventContext} from "../App";
import {useContext, useEffect, useState} from "react";
import EventListItem from "./EventListItem.component";
import {Button} from "reactstrap";


const EventsAccept = () => {
    const [events, setEvents] = useContext(EventContext);
    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(()=> {
        const res = events.filter(event =>
            event.accepted === false
        );
        console.log(res);
        setFilteredEvents(res);
    }, [events]);



    return (
        <div>
        {
            filteredEvents.length !== 0 ?
            filteredEvents.map((event) => (
                <div style={{display: "flex", marginBottom: "5px"}}>
                 <EventListItem event={event} />
                <Button style={{display: "inline"}}>
                    Zatwierdz
                </Button>
                </div>
            )) : null
        }
        </div>
    )
}

export default EventsAccept;