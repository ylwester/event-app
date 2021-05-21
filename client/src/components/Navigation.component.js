import { useState, useContext } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";

import {UserContext} from "../App";

import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({logOutCallback}) => {
  const [user] = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="" color="light" light expand="md">
      <NavbarBrand>
        <Link style={{textDecoration: 'none'}} to={'/'}>EVENT APP</Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="container-fluid" navbar>
          {
            user.accessToken ?           <NavItem>
              <Link to="/event/add">Dodaj wydarzenie</Link>
            </NavItem> : null
          }
          <NavItem>
            <Link to="/events">Przeglądaj</Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">Kontakt</Link>
          </NavItem>
          <UncontrolledDropdown className="ml-auto" nav inNavbar>
            <DropdownToggle nav caret>
              Zaloguj się
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/login">Zaloguj się</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/register">Zarejestruj</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
