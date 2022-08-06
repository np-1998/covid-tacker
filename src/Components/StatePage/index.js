import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import StateClassComponent from './DetailedStateComponent';


export default function StateComponent() {

    const location = useLocation();
    const { timeseries, districts, ...stateStats } = location.state;
    const districtsStats = Object.entries(districts ? districts : []).map(item => {
        let district = item[1];
        let population = (district.meta && district.meta.population) ? district.meta.population : 0;
        let confirmed = (district.total && district.total.confirmed) ? district.total.confirmed : 0;
        let vaccinated = (district.total && district.total.vaccinated2) ? district.total.vaccinated2 : 0;
        return {
            ...district,
            name: item[0],
            affectedPercentage: population && confirmed ? (confirmed / population * 100).toFixed(2) : "-",
            vaccinatedPercentage: population && vaccinated ? ((vaccinated / population) * 100).toFixed(2) : "-"
        }
    });
    const stateTimeseriesData = Object.entries(timeseries).map(i => i = { ...i[1], date: i[0] });

    useEffect(() => {
        document.title = stateStats.statename;
        return () => {
            document.title = "Covid Tracker - India";
        }
    }, []);

    return <StateClassComponent
        stateStats={stateStats}
        districts={districtsStats}
        stateTimeseriesData={stateTimeseriesData}
    />
}
