import React, { useContext, useEffect, useState } from "react";
import FilterMenuComponent from "./FilterMenu.component";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";

import { makeStyles } from "@material-ui/core/styles";

import { EventContext } from "../App";
import "../styles/browseEvents.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

const BrowseEvents = ({ eventCategories }) => {
  const [events, setEvents] = useContext(EventContext);
  const classes = useStyles();

  const [result, setResult] = useState(events);

  return (
    <div className="flex-grid">
      <div className="col">
          <FilterMenuComponent
            events={events}
            result={result}
            setResult={setResult}
            eventsCategories={eventCategories}
          />
        {result.length !== 0 ? (
          result.map((event) => (
            <div className="event-item" key={event._id}>
              <EventListItem event={event} />
            </div>
          ))
        ) : (
          <p> data loading..</p>
        )}
      </div>
      <div className="col">
        <MapWithEvents events={result} />
      </div>
    </div>
  );
};

export default BrowseEvents;
