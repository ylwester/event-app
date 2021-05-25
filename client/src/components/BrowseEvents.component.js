import React, {useContext, useEffect, useState} from "react";
import FilterMenuComponent from "./FilterMenu.component";
import {Col, Row} from "reactstrap";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { EventContext} from "../App";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
}));

const BrowseEvents = ({eventCategories}) => {
    const [events, setEvents] = useContext(EventContext);
    const classes = useStyles();

    const [result, setResult] = useState(events);

  return (
        <Grid container>
            <Grid item xs="12">
                  <FilterMenuComponent events={events} result={result} setResult={setResult} eventsCategories={eventCategories} />
              {/*<Col xs="auto">*/}
              {/*<div style={{width: "35rem"}}>*/}
              {/*    {result.length !== 0 ? result.map(event =>*/}
              {/*    <div style={{marginBottom: "8px"}} key={event._id}>*/}
              {/*        <EventListItem event={event}/>*/}
              {/*    </div>*/}
              {/*    ): <p> data loading..</p>}*/}
              {/*</div>*/}
              {/*</Col>*/}
              {/*  <Col xs="auto">*/}
              {/*      <div>*/}
              {/*          <MapWithEvents events={result} />*/}
              {/*      </div>*/}
              {/*  </Col>*/}
            </Grid>
        </Grid>
  )
};

export default BrowseEvents;
