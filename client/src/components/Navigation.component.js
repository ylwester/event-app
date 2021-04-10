import { useState } from "react";
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
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="" color="light" light expand="md">
      <NavbarBrand href="/">EVENT APP</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="container-fluid" navbar>
          <NavItem>
            <NavLink href="/event/add">Dodaj wydarzenie</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/events">Przeglądaj</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Kontakt</NavLink>
          </NavItem>
          <UncontrolledDropdown className="ml-auto" nav inNavbar right>
            <DropdownToggle nav caret>
              Zaloguj się
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/login">Zaloguj się</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/register">Zarejestruj</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
