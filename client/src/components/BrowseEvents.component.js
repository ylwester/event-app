import React from "react";
import {useRouteMatch, Route, Switch} from "react-router-dom";

import ShowEvent from "./ShowEvent.component";

const BrowseEvents = () => {
    const {path} = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <h1> Browse Events</h1>
            </Route>
            <Route path={`${path}/:eventId`}><ShowEvent/></Route>
        </Switch>
    );
}

export default BrowseEvents