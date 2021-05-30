import React, { useContext, useEffect, useState } from "react";
import FilterMenuComponent from "./FilterMenu.component";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";
import { AcceptedEventContext } from "../App";
import "../styles/browseEvents.css";

const BrowseEvents = ({ eventCategories }) => {
    const [events, setEvents] = useContext(AcceptedEventContext);
  const [result, setResult] = useState(events);

  return (
    <div className="wrapper">
      {/*<div className="col">*/}
          <FilterMenuComponent
            events={events}
            result={result}
            setResult={setResult}
            eventsCategories={eventCategories}
          />
          <div className="event-container events-list">
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
      {/*</div>*/}
      <div className="event-container events-map">
        <MapWithEvents events={result} />
      </div>
    </div>
  );
};

export default BrowseEvents;
