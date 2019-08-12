import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { History } from 'history'

import { connectRouter } from 'connected-react-router'
import { encounterReducer } from "./encounter/reducers";

const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    encounter: encounterReducer,
});

export type AppState = ReturnType<ReturnType<typeof rootReducer>>;

export default function configureStore(history: History) {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer(history),
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
