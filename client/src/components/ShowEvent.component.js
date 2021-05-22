import {useParams} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {Container} from "reactstrap";

import {EventContext} from "../App";


function ShowEvent() {
    const [events, setEvents] = useContext(EventContext);
    const { eventId } = useParams();
  const [event, setEvent] = useState(()=> {
      return events.filter(event => event._id === eventId);
  });

      useEffect(() => {
          const result = events.filter(event => event._id === eventId);
          setEvent(result[0]);
      }, [eventId])


    console.log(event);

  let createdAt = new Date(event.createdAt)


  return (
    <Container className="themed-container" fluid="lg">
        <h1>{event.title}</h1>
        <p>Dodane przez: {event.author}, dnia {createdAt.toLocaleDateString()}</p>
        <span style={{whiteSpace: "pre-wrap"}}>{event.description}</span>

  </Container>
)}

export default ShowEvent;
