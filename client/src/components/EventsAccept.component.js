import React, {useCallback, useContext, useEffect, useState} from "react";
import EventListItem from "./EventListItem.component";
import {Alert, Button, Container} from "reactstrap";
import axios from "axios";
import '../styles/eventAccept.css'

import { UserContext } from "../App";

import { NotAcceptedEventContext } from "../App";

const EventsAccept = () => {
    const [user] = useContext(UserContext);
    const [events, setEvents] = useContext(NotAcceptedEventContext);
    const [updatedArr, setUpdatedArr] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState({
        message: '',
        color: '',
    });

    const onDismiss = () => setVisible(false);

    const handleAccept = useCallback((id) => {
        let updatedArr = [...filteredEvents];
        let findIndex = filteredEvents.findIndex(event => event._id === id);
        updatedArr[findIndex].accepted = true;
            axios.post('http://localhost:5000/api/events/accept/' + id)
                .then(response => {
                    setMessage({color: "success", message: response.data})
                    setVisible(true);
                })
                .catch(err => {
                    setMessage({color: "warning", message: err})
                    setVisible(true);
                });
        setUpdatedArr(updatedArr);
        setFilteredEvents(updatedArr);
    },[filteredEvents]);

    const handleReject = useCallback((id) => {
        let updatedArr = [...filteredEvents];
        let findIndex = filteredEvents.findIndex(event => event._id === id);
        updatedArr[findIndex].accepted = true;
        axios.delete('http://localhost:5000/api/events/delete/' + id)
            .then(response => {
                setMessage({color: "success", message: response.data})
                setVisible(true);
            })
            .catch(err => {
                setMessage({color: "warning", message: err})
                setVisible(true);
            });
        setUpdatedArr(updatedArr);
        setFilteredEvents(updatedArr);
    },[filteredEvents]);


    useEffect(()=> {
        const res = events.filter(event =>
            event.accepted === false
        );
        setFilteredEvents(res);
    }, [events, updatedArr]);

    return (
        <Container className="event-accept-container">
            <div>
                <h4>Do zaakceptowania</h4>
            </div>
            <Alert color={message.color} isOpen={visible} toggle={onDismiss}>
                {message.message}
            </Alert>
        {
            user.accessToken && user.role === "admin" ?
            filteredEvents.length !== 0 ?
            filteredEvents.map((event) => (
                <div className="accept-event-item">
                    <div>
                        <EventListItem event={event} />
                    </div>
                    <div className="event-accept-buttons">
                        <Button onClick={() => handleAccept(event._id)} style={{display: "inline", margin: "10px"}}>
                            Zatwierdź
                        </Button>
                        <Button onClick={() => handleReject(event._id)} style={{display: "inline", margin: "10px"}}>
                            Odrzuć
                        </Button>
                    </div>
                </div>
            )) : <p>    Brak wydarzeń oczekujących na akceptację.</p>
                : <p>Access denied</p>
        }
        </Container>
    )
}

export default EventsAccept;