import {Button, Jumbotron} from "reactstrap";
import React from "react";

const HeaderComponent = () => {
  return (
      <Jumbotron>
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
</Jumbotron>
  );
};

export default HeaderComponent;
