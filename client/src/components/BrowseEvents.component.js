import React, {useEffect, useState} from "react";
import {useRouteMatch, useLocation, Route, Switch} from "react-router-dom";
import ShowEvent from "./ShowEvent.component";
import FilterMenuComponent from "./FilterMenu.component";
import {Col, Container, Row} from "reactstrap";
import {useQueryParams, ArrayParam, StringParam} from "use-query-params";

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


  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Container fluid={true}>
            <Row xs="3">
              <Col sm={{size: 2}}>
                  <FilterMenuComponent eventsCategories={eventCategories} />
              </Col>
              <Col>
              <button onClick={()=> {setQuery({category: 2}); window.location.reload()}}>Categoria teatr</button>
              <div>
                  {events.length !== 0 ? events.map(event =>
                  <ul>
                      <li>{event.title}</li>
                      <li>{event.description}</li>
                      <li>{event.day}</li>
                      <li>{event.time}</li>
                      <li>{event.price}</li>
                      <li>{event.categories.map(category => <p style={{fontSize: "10px"}}>{category.name}</p>)}</li>
                  </ul>
                  ): <p> data loading..</p>}
              </div>
              </Col>
            </Row>
        </Container>
      </Route>
      <Route path={`${path}/:eventId`}>
        <ShowEvent />
      </Route>
    </Switch>
  );
};

export default BrowseEvents;
