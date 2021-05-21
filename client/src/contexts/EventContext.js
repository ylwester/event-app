import React, {useState, createContext} from "react";

export const EventContext = createContext([]);

const EventContextProvider = (props) => {
    const [events, setEvents] = useState({});

    // useEffect(() => {
    //     async function getEventsFromApi() {
    //         await axios
    //             .get("http://localhost:5000/api/events")
    //             .then((response) => {
    //                 setEvents(response.data.events);
    //                 console.log(response.data);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    //
    //     getEventsFromApi();
    // }, []);

    return (
        <EventContext.Provider value={[events, setEvents]}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;