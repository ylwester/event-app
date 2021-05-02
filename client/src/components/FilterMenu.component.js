import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "../styles/filterMenu.css";
import { StringParam, useQueryParams } from "use-query-params";

const FilterMenuComponent = ({ events, eventsCategories }) => {
  const [query, setQuery] = useQueryParams({
    category: StringParam,
    paid: StringParam,
    day: StringParam,
  });

  useEffect(() => {
    if (query.paid) document.getElementById("paid").checked = true;

    if (query.day) document.getElementById("day").value = query.day;
  });

  const handlePaid = () => {
    if (query.paid !== undefined) {
      setQuery({ paid: undefined });
    } else {
      setQuery({ paid: "false" });
    }
    window.location.reload();
  };

  const handleCategory = (category) => {
    if (query.category === category.id.toString()) {
      setQuery({ category: undefined });
    } else {
      setQuery({ category: category.id });
    }
    window.location.reload();
  };

  const handleDate = (e) => {
    if (query.day !== undefined && query.day === e.target.value) {
      setQuery({ day: undefined });
    } else {
      setQuery({ day: e.target.value });
    }
    window.location.reload();
  };

  return (
      <Container>
          <h5 className="p-1">Filtry</h5>
          <h6 className="p-1 border-bottom">Kategorie</h6>
          <ListGroup flush>
              {eventsCategories.length !== 0
                  ? eventsCategories.map((category) => (
                      <ListGroupItem
                          id={category.id}
                          onClick={() => handleCategory(category)}
                          key={category.id}
                          className={
                              query.category === category.id.toString()
                                  ? "category active"
                                  : "category"
                          }
                      >
                          {category.name}
                      </ListGroupItem>
                  ))
                  : null}
          </ListGroup>
          <h6 className="p-1 border-bottom">Płatność</h6>
          <Form>
              <FormGroup check>
                  <Label style={{ padding: ".5rem 1rem" }} check for="paid">
                      <Input
                          id="paid"
                          onChange={handlePaid}
                          type="checkbox"
                          name="paid"
                      />
                      {""}
                      Darmowe
                  </Label>
              </FormGroup>
              <h6 className="p-1 border-bottom">Data</h6>
              <FormGroup style={{ marginTop: "10px" }}>
                  <input onChange={(e) => handleDate(e)} id="day" type="date" />
              </FormGroup>
          </Form>
      </Container>
  );
};

export default FilterMenuComponent;
