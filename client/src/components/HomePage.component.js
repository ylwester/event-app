import HomeEventListItem from "./HomeEventListItem.component";
import "../styles/homePage.css";
import "../App.css";
import React, { useContext } from "react";

import { AcceptedEventContext } from "../App";
import { Button} from "reactstrap";
import {Link} from "react-router-dom";

const HomePage = () => {
  const [result] = useContext(AcceptedEventContext);
  const homePageEvents = result.slice(0, 4);

  return (
    <div className="main-wrapper wrap">
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#B9BBBC",
          padding: "20px",
        }}
      >
        <span className="text-center lead" style={{ lineHeight: "" }}>
          <h1 style={{ lineHeight: "1" }}>Event APP</h1>
          <h2 style={{ lineHeight: "2.5" }}>
            Aplikacja stworzona by pomóc znaleźć Ci rozrywkę!
          </h2>
          <Link to="/events"><Button>Przeglądaj wydarzenia</Button></Link>
        </span>
      </header>
      <div className="homepage-content">
        <div className="content-title">
            <h2 style={{padding: "10px"}}>Nadchodzace wydarzenia</h2>
        </div>
          <div className="content-events">
        {homePageEvents.length !== 0
          ? homePageEvents.map((event) => (
                  <HomeEventListItem event={event} />
            ))
          : null}
          </div>
      </div>
    </div>
  );
};

export default HomePage;
