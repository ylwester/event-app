import React, {useContext, useEffect, useState} from "react";
import FilterMenuComponent from "./FilterMenu.component";
import {Col, Container, Row} from "reactstrap";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";

import { EventContext} from "../App";

const BrowseEvents = ({eventCategories}) => {
    const [events, setEvents] = useContext(EventContext);

    const [result, setResult] = useState(events);

  return (
        <Container fluid={true}>
            <Row xs="3">
              <Col sm={{size: 2}}>
                  <FilterMenuComponent events={events} result={result} setResult={setResult} eventsCategories={eventCategories} />
              </Col>
              <Col xs="auto">
              <div style={{width: "35rem"}}>
                  {result.length !== 0 ? result.map(event =>
                  <div style={{marginBottom: "8px"}} key={event._id}>
                      <EventListItem event={event}/>
                  </div>
                  ): <p> data loading..</p>}
              </div>
              </Col>
                <Col xs="auto">
                    <div>
                        <MapWithEvents events={result} />
                    </div>
                </Col>
            </Row>
        </Container>
  )
};

export default BrowseEvents;
