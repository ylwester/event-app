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
import axios from "axios";

const Navigation = () => {
  const [user, setUser] = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logOutCallback = async () => {
    console.log(user);
    await axios.post('http://localhost:5000/api/users/logout', '', {
      withCredentials: true,
    })
        .then(()=> {
          setUser({});
        })
        .catch((err)=> console.error(err));
  };

  return (
    <Navbar className="" color="light" light expand="md">
      <NavbarBrand>
        EVENT APP
        {/*<Link style={{textDecoration: 'none'}} to={'/'}>EVENT APP</Link>*/}
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
          <NavItem>
            <Link to="/toacceptevents">Do zaakceptowania</Link>
          </NavItem>
          {

            user.accessToken ?
                <div className="ml-auto">
              {user.name}
                  <input type="button" onClick={logOutCallback} value="Wyloguj się" />
            </div>
                :
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
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
