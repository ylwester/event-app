import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import axios from "axios";


import BrowseEvents from "./components/BrowseEvents.component";
import HomePage from "./components/HomePage.component";
import AddEventItem from "./components/AddEventItem.component";
import ContactPage from "./components/ContactPage.component";
import LoginPage from "./components/LoginPage.component";
import RegisterPage from "./components/RegisterPage.component";
import Navigation from "./components/Navigation.component";


function App() {
  const token = localStorage.getItem("token");

  const [loginStatus, setLoginStatus] = useState(token);


  useEffect(() => {
    if(!loginStatus) {
      axios.get("http://localhost:5000/api/users/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((response) => {
        console.log(response);
        setLoginStatus(true);
      })
    }}, [])

  const [eventCategories] = useState([
    {
      name: "Koncert",
      id: 1,
    },
    {
      name: "Teatr",
      id: 2,
    },
    {
      name: "Na zewnątrz",
      id: 3,
    },
  ]);

  return (
    <div>
      <Navigation loginStatus={loginStatus} />
        <Switch>
          <Route path={["/", "/home"]} exact component={HomePage} />
          <Route path="/event/add" render={props =>
              (<AddEventItem{...props} eventCategories={eventCategories} />)
          }/>
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" render={props =>
              (<LoginPage{...props} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />)
          }/>
          <Route path="/register" component={RegisterPage} />
          <Route path="/events" render={props =>
              ( <BrowseEvents {...props} eventCategories={eventCategories} />)
          }>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
