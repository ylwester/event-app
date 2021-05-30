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
import EventsAccept from "./components/EventsAccept.component";

axios.defaults.withCredentials = true;
export const UserContext = createContext([]);
export const AcceptedEventContext = createContext([]);
export const NotAcceptedEventContext = createContext([]);
function App() {
    const [acceptedEvents, setAcceptedEvents] = useState({});
    const [notAcceptedEvents, setNotAcceptedEvents] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function checkRefreshToken() {
      await axios
        .post("http://localhost:5000/api/users/refresh_token", '',{
          withCredentials: true,
        })
        .then((response) => {
            console.log(response)
          setUser({
              name: response.data.name,
              accessToken: response.data.accesstoken,
              role: response.data.role,
          });
        });
    }
    async function getEventsFromApi() {
      await axios
          .get("http://localhost:5000/api/events")
          .then((response) => {
            console.log(response.data);
              const resAccepted = response.data.filter(event =>
                  event.accepted === true);
              const resNotAccepted = response.data.filter(event =>
                  event.accepted === false);
            setAcceptedEvents(resAccepted)
              setNotAcceptedEvents(resNotAccepted);
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
        <AcceptedEventContext.Provider value={[acceptedEvents, setAcceptedEvents]}>
            <Route path={["/", "/home"]} exact component={HomePage} />
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
    </AcceptedEventContext.Provider>
        <NotAcceptedEventContext.Provider value={[notAcceptedEvents, setNotAcceptedEvents]}>
            <Route path={`/toacceptevents`}>
                <EventsAccept />
            </Route>
        </NotAcceptedEventContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
