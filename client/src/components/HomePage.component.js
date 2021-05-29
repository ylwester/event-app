import HomeEventListItem from "./HomeEventListItem.component";
import "../styles/homePage.css";
import "../App.css";
import React, { useContext } from "react";

import { EventContext } from "../App";
import { Button} from "reactstrap";

const HomePage = () => {
  const [result] = useContext(EventContext);
  const homePageEvents = result.slice(0, 4);

  return (
    <div className="main-wrapper wrap">
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue",
          padding: "20px",
        }}
      >
        <span className="text-center lead" style={{ lineHeight: "" }}>
          <h1 style={{ lineHeight: "1" }}>Fiesta</h1>
          <h2 style={{ lineHeight: "2.5" }}>
            Aplikacja stworzona by pomóc znaleźć Ci rozrywkę!
          </h2>
          <Button>Dowiedz się więcej</Button>
        </span>
      </header>
      <div className="homepage-content">
        <div>Nadchodzace wydarzenia</div>
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
