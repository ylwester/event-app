import HeaderComponent from "./Header.component";
import '../styles/homePage.css'
import '../App.css';
import MapWithEvents from "./MapWithEvents.component";
import React, {useContext} from "react";

import {EventContext} from "../App";

const HomePage = () => {
    const [result] = useContext(EventContext);

    return (
        <div className="main-wrapper wrap" >
            <HeaderComponent />
            {/*<div className="homepage-events">*/}
            {/*    <MapWithEvents events={result} />*/}
            {/*</div>*/}
        </div>
    )
}

export default HomePage;