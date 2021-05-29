import {Card, CardBody, CardText, CardTitle, CardLink, CardSubtitle }from "reactstrap";
import React from "react";
import '../styles/homeEventListItem.css'

const HomeEventListItem = ({event}) => {

    return (
        <div className="home-event-item">
            <div className="title">
                {event.title}
            </div>
            <div></div>
        </div>
    )
}

export default HomeEventListItem;