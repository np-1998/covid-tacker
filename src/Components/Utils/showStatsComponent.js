
import React from 'react';

export default function ShowStatsComponent(props) {
    return (
        <React.Fragment>
            <p>Confirmed : {props.data && props.data.confirmed ? props.data.confirmed : "-"}</p>
            <p>Recoverd : {props.data && props.data.recovered ? props.data.recovered : "-"}</p>
            <p>Deceased : {props.data && props.data.deceased ? props.data.deceased : "-"}</p>
        </React.Fragment>
    )
}
