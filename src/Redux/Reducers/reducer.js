
import * as ActionTypes from "../types";


const initialState = {
    covidDataArray: [],
    loading: false
}

export default (state = initialState, { type, data }) => {
    switch (type) {
        case ActionTypes.GET_COVID_DATA_SUCCESS:
            return { ...state, covidDataArray: data}
        case ActionTypes.UPDATE_DATA_LOADER:
            return { ...state, loading: data }
        default:
            return state
    }
}