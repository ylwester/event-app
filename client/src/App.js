import React, { useEffect, useState, createContext } from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";

import BrowseEvents from "./components/BrowseEvents";
import HomePage from "./components/HomePage";
import AddEventItem from "./components/AddEventItem";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navigation from "./components/Navigation";
import ShowEvent from "./components/ShowEvent";
import EventsAccept from "./components/EventsAccept";

axios.defaults.withCredentials = true;
export const UserContext = createContext([]);
export const AcceptedEventContext = createContext([]);
export const NotAcceptedEventContext = createContext([]);
export const EventContext = createContext([]);

function App() {
  const [events, setEvents] = useState({});
  const [acceptedEvents, setAcceptedEvents] = useState({});
  const [notAcceptedEvents, setNotAcceptedEvents] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRefreshToken() {
      await axios
        .post(process.env.baseURL || "/api/users/refresh_token", "", {
          withCredentials: true,
        })
        .then((response) => {
          setUser({
            name: response.data.name,
            accessToken: response.data.accesstoken,
            role: response.data.role,
          });
        });
    }
    async function getEventsFromApi() {
      await axios
        .get(process.env.baseURL || "/api/events")
        .then((response) => {
            console.log(response);
          const resAccepted = response.data.filter(
            (eventy) => eventy.accepted === true
          );
          const resNotAccepted = response.data.filter(
            (eventy) => eventy.accepted === false
          );
          setAcceptedEvents(resAccepted);
          setNotAcceptedEvents(resNotAccepted);
          setEvents(response.data);
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
      <Navigation />
      <Route
        path="/event/add"
        render={(props) => (
          <AddEventItem {...props} eventCategories={eventCategories} />
        )}
      />
      <Route path="/contact" component={ContactPage} />
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
      <Route path="/register" component={RegisterPage} />
      <AcceptedEventContext.Provider
        value={[acceptedEvents, setAcceptedEvents]}
      >
        <Route path={["/", "/home"]} exact component={HomePage} />
        <Route
          exact
          path="/events"
          render={(props) => (
            <BrowseEvents {...props} eventCategories={eventCategories} />
          )}
        />
        <EventContext.Provider value={[events, setEvents]}>
          <Route path={`/events/:eventId`}>
            <ShowEvent />
          </Route>
        </EventContext.Provider>
      </AcceptedEventContext.Provider>
      <NotAcceptedEventContext.Provider
        value={[notAcceptedEvents, setNotAcceptedEvents]}
      >
        <Route path={`/toacceptevents`}>
          <EventsAccept />
        </Route>
      </NotAcceptedEventContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
