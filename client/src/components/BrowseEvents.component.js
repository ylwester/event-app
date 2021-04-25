import React, {useEffect, useState} from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";

import ShowEvent from "./ShowEvent.component";
import {Col, Container, Row} from "reactstrap";

const BrowseEvents = () => {
    const [events, setEvents] = useState('');
    const [url, setUrl] = useState('http://localhost:5000/api/events/');

    const getEvents = () =>
        fetch(url)
            .then((res) => res.json())


    useEffect(() => {
       getEvents().then((events) => setEvents(events))
    }, [getEvents()]);

  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Container fluid={true}>
          <div>
              <div>
                  {events.length !== 0 ? events.map(event =>
                  <ul>
                      <li>{event.title}</li>
                      <li>{event.description}</li>
                      <li>{event.day}</li>
                      <li>{event.time}</li>
                      <li>{event.price}</li>
                      <li>{event.categories.map(category => category.name)}</li>
                  </ul>
                  ): <p> data loading..</p>}
              </div>
          </div>
        </Container>
      </Route>
      <Route path={`${path}/:eventId`}>
        <ShowEvent />
      </Route>
    </Switch>
  );
};

export default BrowseEvents;
