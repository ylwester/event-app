import React from "react";
import {Card, CardBody} from "reactstrap";
import "../styles/eventListItem.css";
import {Link} from "react-router-dom";

const EventListItem = ({event}) => {
    return (
        <Card style={{width: "35rem"}}>
            <CardBody style={{padding: "11px"}}>
                <header>
                    <div className="title">{event.title}</div>
                    <div className="price">{event.paid ? event.price + "zł" : "Darmowe"}</div>
                </header>
                <div id="container">
                    <div id="left-wrapper">
                        <div className="categories">
                            {event.categories.map(category =>
                                <div className="cat" key={category.id}>{category.name}</div>
                            )}
                        </div>
                        <div id="location">
                             {event.city}
                        </div>
                    </div>
                    <div id="full-post">
                        <Link to={location => `${location.pathname}/${event._id}`} >Zobacz więcej</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default EventListItem;