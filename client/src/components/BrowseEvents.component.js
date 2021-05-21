import React, {useEffect, useState} from "react";
import {useRouteMatch, useLocation, Route, Switch} from "react-router-dom";
import ShowEvent from "./ShowEvent.component";
import FilterMenuComponent from "./FilterMenu.component";
import {Col, Container, Row} from "reactstrap";
import {useQueryParams, ArrayParam, StringParam} from "use-query-params";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";

const BrowseEvents = ({eventCategories}) => {
    const [query, setQuery] = useQueryParams({
        category: StringParam,
        paid: StringParam,
        date: StringParam,
    });

    const [urlQuery, setUrlQuery] = useState(useLocation().search);

    const [events, setEvents] = useState('');
    const [url, setUrl] = useState(`http://localhost:5000/api/events${urlQuery}`);

    const getEvents = () =>
        fetch(url)
            .then((res) => res.json())
    useEffect(() => {

       getEvents().then((events) => setEvents(events))
    });


  // const { path } = useRouteMatch();
  return (
    // <Switch>
    //   <Route exact path={path}>
        <Container fluid={true}>
            <Row xs="3">
              <Col sm={{size: 2}}>
                  <FilterMenuComponent eventsCategories={eventCategories} />
              </Col>
              <Col xs="auto">
              <div style={{width: "35rem"}}>
                  {events.length !== 0 ? events.map(event =>
                  <div style={{marginBottom: "8px"}} key={event._id}>
                      <EventListItem event={event}/>
                  </div>
                  ): <p> data loading..</p>}
              </div>
              </Col>
                <Col xs="auto">
                    <div>
                        <MapWithEvents events={events} />
                    </div>
                </Col>
            </Row>
        </Container>
      // </Route>
      // {<Route path={`${path}/:eventId`}>}
      // {     <ShowEvent />}
      // {</Route>}
    // </Switch>
  )
};

export default BrowseEvents;
