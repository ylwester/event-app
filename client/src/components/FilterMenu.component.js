import React, { useEffect, useState } from "react";
import { CustomInput, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/filterMenu.css";

const FilterMenuComponent = ({ events, setResult, eventsCategories }) => {
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterByPaid, setFilterByPaid] = useState("");
  const [filterByDate, setFilterByDate] = useState("");

  useEffect(() => {
    if (filterByPaid) {
      document.getElementById("paid").checked = true;
    } else {
      document.getElementById("paid").checked = false;
    }
    if (!filterByCategory) {
      document.getElementById("category-filter").selectedIndex = 0;
    }
    if (!filterByDate) {
      document.getElementById("day").value = "";
    }

    // if (query.day) document.getElementById("day").value = query.day;
  });

  useEffect(() => {
    const res = events.filter(
      (event) =>
        (!filterByCategory ||
          event.categories.some(
            (cat) => cat.id.toString() === filterByCategory
          )) &&
        (!filterByPaid || event.paid.toString() === filterByPaid) &&
        (!filterByDate || event.day === filterByDate)
    );
    setResult(res);
  }, [filterByCategory, filterByPaid, filterByDate, events, setResult]);

  const handleCategory = (e) => {
    setFilterByCategory(e.target.value);
  };

  const handlePaid = () => {
    if (!filterByPaid) {
      setFilterByPaid("false");
    } else {
      setFilterByPaid("");
    }
  };

  const handleDate = (e) => {
    setFilterByDate(e.target.value);
  };
  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilterByCategory("");
    setFilterByDate("");
    setFilterByPaid("");
  };

  return (
    <div className="filters-menu">
      <Form inline className="filters-menu-form-groups">
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Input
            type="select"
            name="categories"
            id="category-filter"
            defaultValue={filterByCategory}
            onChange={handleCategory}
          >
            <option value="" disabled selected hidden>
              Kategorie
            </option>
            <option value="">Wszystkie</option>
            {eventsCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <CustomInput
            type="checkbox"
            id="paid"
            name="paid"
            onClick={handlePaid}
            label="Tylko darmowe"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Input
            type="date"
            id="day"
            onChange={handleDate}
            placeholder="Wybierz date"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <input
            type="button"
            value="Wyczyść filtry"
            onClick={handleClearFilters}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default FilterMenuComponent;
