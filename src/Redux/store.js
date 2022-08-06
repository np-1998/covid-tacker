import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from "./Reducers/reducer";

const rootReducer = combineReducers({
    data: reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;