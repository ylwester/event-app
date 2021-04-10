import {useParams} from "react-router-dom";

function ShowEvent () {
    const {eventId} = useParams();
    console.log(eventId);
    return (
        <div>
            <h1>Show {eventId}</h1>

        </div>
    )
}


export default ShowEvent;