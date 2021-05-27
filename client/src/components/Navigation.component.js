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
    NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import '../styles/navigationBar.css'

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
    <Navbar className="navigation-bar" color="light" light expand="md" style={{borderBottom: "1px solid lightgray"}}>
      <NavbarBrand>
        EVENT APP
        {/*<Link style={{textDecoration: 'none'}} to={'/'}>EVENT APP</Link>*/}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="container-fluid" navbar>
          {
            user.accessToken ?           <NavItem>
              <Link className="nav-link" to="/event/add">DODAJ WYDARZENIE</Link>
            </NavItem> : null
          }

          <NavItem>
            <Link className="nav-link" to="/events">PRZEGLĄDAJ</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/contact">KONTAKT</Link>
          </NavItem>
          {
            user.role === "admin" ?            <NavItem>
              <Link className="nav-link" to="/toacceptevents">DO ZAAKCEPTOWANIA</Link>
            </NavItem> : null
          }
          {
            user.accessToken ?
                <div className="ml-auto">
              {user.name}
                  <input type="button" onClick={logOutCallback} value="Wyloguj się" />
            </div>
                :
                <UncontrolledDropdown className="ml-auto" nav inNavbar>
                  <DropdownToggle nav caret>
                    ZALOGUJ SIĘ
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link className="nav-link" to="/login">Zaloguj się</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link className="nav-link" to="/register">Zarejestruj</Link>
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
