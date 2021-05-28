import {EventContext} from "../App";
import React, {useCallback, useContext, useEffect, useState} from "react";
import EventListItem from "./EventListItem.component";
import {Button} from "reactstrap";
import axios from "axios";

import { UserContext } from "../App";


const EventsAccept = () => {
    const [user] = useContext(UserContext);
    const [events, setEvents] = useContext(EventContext);
    const [updatedArr, setUpdatedArr] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState(()=> {
        return events.filter(event =>
            event.accepted === false
        );
    });

    const handleAccept = useCallback((id) => {
        let updatedArr = [...filteredEvents];
        let findIndex = filteredEvents.findIndex(event => event._id === id);
        updatedArr[findIndex].accepted = true;
        // filteredEvents[findIndex].accepted = true;
        setUpdatedArr(updatedArr);
        setFilteredEvents(updatedArr);
    },[filteredEvents]);

    //
    // const handleAccept = (id) => {
    //     let updatedArr = [...filteredEvents];
    //     let findIndex = filteredEvents.findIndex(event => event._id === id);
    //     updatedArr[findIndex].accepted = true;
    //     // filteredEvents[findIndex].accepted = true;
    //     setFilteredEvents(updatedArr);
    //
    //     // axios.post('http://localhost:5000/api/events/accept/' + id)
    //     //     .then(response => console.log(response))
    //     //     .catch(err => console.log(err));
    // }



    useEffect(()=> {
        const res = events.filter(event =>
            event.accepted === false
        );
        console.log(res);
        setFilteredEvents(res);
    }, [events, updatedArr]);



    return (
        <div>
        {
            user.accessToken && user.role === "admin" ?
            filteredEvents.length !== 0 ?
            filteredEvents.map((event) => (
                <div style={{display: "flex", marginBottom: "5px"}}>
                    <div style={{width: "400px"}}>
                        <EventListItem event={event} />
                    </div>
                <Button onClick={() => handleAccept(event._id)} style={{display: "inline"}}>
                    Zatwierdź
                </Button>
                </div>
            )) : null
                : <p>Access denied</p>
        }
        </div>
    )
}

export default EventsAccept;