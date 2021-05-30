import React from "react";
import '../styles/homeEventListItem.css'

import convertData from "../libs/libs"

const HomeEventListItem = ({event}) => {

    return (
        <div className="home-event-item">
            <div className="home-title">
                <h5>{event.title}</h5>
            </div>
            <div className="home-categories">
                    {event.categories.map(category =>
                        <div className="cat" key={category.id}>{category.name}</div>
                    )}
            </div>
            <div className="home-description">
                {
                    event.description.split(' ').length > 15 ?
                        event.description.split(' ').slice(0,15).join(' ') + '...'
                        :
                        event.description
                }
            </div>
            <div>
                {
                    event.paid ?
                        event.price + 'zł'
                        :
                        'Darmowe'
                }
            </div>
            <div>
                {
                    convertData(event.day)}{event.time ? ", " + event.time : null
                }
            </div>
        </div>
    )
}

export default HomeEventListItem;