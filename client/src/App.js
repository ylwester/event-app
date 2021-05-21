import React, {useEffect, useState, createContext, useContext} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";

import BrowseEvents from "./components/BrowseEvents.component";
import HomePage from "./components/HomePage.component";
import AddEventItem from "./components/AddEventItem.component";
import ContactPage from "./components/ContactPage.component";
import LoginPage from "./components/LoginPage.component";
import RegisterPage from "./components/RegisterPage.component";
import Navigation from "./components/Navigation.component";
import ShowEvent from "./components/ShowEvent.component";

export const UserContext = createContext([]);

export const EventContext = createContext([]);

function App() {
    const [events, setEvents] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = () => {};

  useEffect(() => {
    async function checkRefreshToken() {
      await axios
        .post("http://localhost:5000/api/users/refresh_token", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.accesstoken);
          setUser({
            accessToken: response.data.accesstoken,
          });
          // setLoading(false);
        });
    }
    async function getEventsFromApi() {
      await axios
          .get("http://localhost:5000/api/events")
          .then((response) => {
            console.log(response.data);
            setEvents(response.data)
          })
          .catch((err) => console.log(err));
      setLoading(false);
    }

    getEventsFromApi();
    checkRefreshToken();
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navigation logOutCallback={logOutCallback} />
      <Route path={["/", "/home"]} exact component={HomePage} />
      <Route
        path="/event/add"
        render={(props) => (
          <AddEventItem {...props} eventCategories={eventCategories} />
        )}
      />
      <Route path="/contact" component={ContactPage} />
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
      <Route path="/register" component={RegisterPage} />
        <EventContext.Provider value={[events, setEvents]}>
        <Route
          exact
          path="/events"
          render={(props) => (
            <BrowseEvents {...props} eventCategories={eventCategories} />
          )}
        />

        <Route path={`/events/:eventId`}>
          <ShowEvent />
        </Route>
    </EventContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
