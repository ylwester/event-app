import {useParams} from "react-router-dom";

function ShowEvent () {
    const {eventId} = useParams();

    return (
        <div>
            <h1>Show {eventId}</h1>

        </div>
    )
}


export default ShowEvent;