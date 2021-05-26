import React from "react";
import {Card, CardBody} from "reactstrap";
import "../styles/eventListItem.css";
import {Link} from "react-router-dom";

import convertData from "../libs/libs"

const EventListItem = ({event}) => {

    return (
        <Card id="event-card">
            <CardBody style={{padding: "8px"}}>
                <header>
                    <div className="title">{event.title}</div>
                    <div className="price">{event.paid ? event.price + "zł" : "Darmowe"}</div>
                </header>
                <div id="middle-wrapper">
                    <div className="event-data">{convertData(event.day)}{event.time ? ", " + event.time : null}</div>
                    <div id="location">
                        {event.city}
                    </div>
                </div>
                <div id="container">
                    <div id="left-wrapper">
                        <div className="categories">
                            {event.categories.map(category =>
                                <div className="cat" key={category.id}>{category.name}</div>
                            )}
                        </div>
                    </div>
                    <div id="full-post">
                        <Link to={location => `/events/${event._id}`} >Zobacz więcej</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default EventListItem;