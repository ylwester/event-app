import { Button } from "reactstrap";

const HeaderComponent = () => {
  return (
    <header
      className="p-5 h-25"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="text-center" style={{ lineHeight: "" }}>
        <h1 style={{ lineHeight: "1" }}>Fiesta</h1>
        <h2 style={{ lineHeight: "2.5" }}>
          Aplikacja stworzona by pomóc znaleźć Ci rozrywkę!
        </h2>
        <Button>Dowiedz się więcej</Button>
      </span>
    </header>
  );
};

export default HeaderComponent;
