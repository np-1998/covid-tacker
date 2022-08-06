
import { GET_COVID_DATA_SUCCESS, UPDATE_DATA_LOADER } from "../types";
import { statesNameObj } from "../../Utils/stateNames";
import { urls } from "../../Utils/constants";

export const getCovidDataAction = () => async dispatch => {
    // console.time();
    dispatch(updateLoader(true));
    try {
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            dispatch(loadDataFromApi());
        } else {
            let dbReq = window.indexedDB.open('covidstats', 1);
            dbReq.onupgradeneeded = function () {
                let db = dbReq.result;
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: "statecode" });
                }
            };
            dbReq.onsuccess = (e) => {
                let db = dbReq.result;
                let trxn = db.transaction("data", "readonly");
                let store = trxn.objectStore("data");
                let res = store.getAll();
                res.onsuccess = async () => {
                    if (res.result && res.result.length > 0) {
                        // console.timeEnd();
                        dispatch(updateCovidData(res.result));
                    } else {
                        let covidDataArr = await dispatch(getDataFromApi());
                        // console.timeEnd();
                        dispatch(updateCovidData(covidDataArr));
                        trxn = db.transaction("data", "readwrite");
                        covidDataArr.forEach(state => {
                            trxn.objectStore("data").add(state);
                        })
                        trxn.oncomplete = function () {
                            console.log("Data persisted successfully");
                        }
                    }
                }
                res.onerror = async () => {
                    dispatch(loadDataFromApi());
                }
            }
            dbReq.onerror = async function () {
                dispatch(loadDataFromApi());
            }
        }
    } catch (e) {
        console.error("API fetch error : ", e);
        alert("Unable to fetch covid data from API!");
    } finally {
        dispatch(updateLoader(false));
        // console.timeEnd();
    }
}

const loadDataFromApi = () => async dispatch => {
    let data = await dispatch(getDataFromApi());
    dispatch(updateCovidData(data));
}

const getDataFromApi = () => async dispatch => {
    try {
        let values = await Promise.all([dispatch(getOverallStats), dispatch(getTimeseriesStats)]);
        let overallStats = values[0], timeseriesStats = values[1];
        let formattedArray = Object.keys(overallStats).map(key => {
            let state = overallStats[key];
            let population = (state.meta && state.meta.population) ? state.meta.population : 0;
            let confirmed = (state.total && state.total.confirmed) ? state.total.confirmed : 0;
            let vaccinated = (state.total && state.total.vaccinated2) ? state.total.vaccinated2 : 0;
            return {
                ...state,
                timeseries: timeseriesStats[key].dates,
                statename: statesNameObj[key],
                statecode: key,
                affectedPercentage: (population && confirmed) ? ((confirmed / population) * 100).toFixed(2) : "-",
                vaccinatedPercentage: (population && vaccinated) ? ((vaccinated / population) * 100).toFixed(2) : "-"
            }
        });
        return formattedArray
    } catch (error) {
        console.error("Promise failed error : ", error);
        return []
    }
}

const getOverallStats = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(urls.statsApiEndpoint)
                .then(res => res.json())
                .then(json => {
                    resolve(json);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        } catch (e) {
            console.error("API fetch error : ", e);
            reject(e);
        }
    });
}

const getTimeseriesStats = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(urls.timeseriesApiEndpoint)
                .then(res => res.json())
                .then(json => {
                    resolve(json);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        } catch (e) {
            console.error("API fetch error : ", e);
            reject(e);
        }
    });
}

const updateCovidData = (data) => {
    return {
        type: GET_COVID_DATA_SUCCESS,
        data: data
    };
}

const updateLoader = (loading) => {
    return {
        type: UPDATE_DATA_LOADER,
        data: loading
    };
}