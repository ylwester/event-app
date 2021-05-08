import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

function ShowEvent() {
  const [event, setEvent] = useState("");
  const { eventId } = useParams();

  const getEvent = () =>
    fetch(`http://localhost:5000/api/events/${eventId}`).then((res) =>
      res.json()
    );
  useEffect(() => {
    getEvent().then((event) => setEvent(event));
  });

  let createdAt = new Date(event.createdAt)


  return (
    <Container className="themed-container" fluid="lg">
        <h1>{event.title}</h1>
        <p>Dodane przez: {event.author}, dnia {createdAt.toLocaleDateString()}</p>
        <span style={{whiteSpace: "pre-wrap"}}>{event.description}</span>

  </Container>
)}

export default ShowEvent;
