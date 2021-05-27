import React, { useContext, useEffect, useState } from "react";
import FilterMenuComponent from "./FilterMenu.component";
import EventListItem from "./EventListItem.component";
import MapWithEvents from "./MapWithEvents.component";
import { EventContext } from "../App";
import "../styles/browseEvents.css";

const BrowseEvents = ({ eventCategories }) => {
    const [events, setEvents] = useContext(EventContext);
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
          <div style={{height: "83vh", overflowY: "scroll"}}>
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
      </div>
      <div className="col">
        <MapWithEvents events={result} />
      </div>
    </div>
  );
};

export default BrowseEvents;
