import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ImportFileReducer from '../src/store/reducers/importFileReducer';
import searchReducer from '../src/store/reducers/searchReducer';
import Config from './config';
axios.defaults.baseURL = Config.apiBaseUrl;

/*
    Make entry of new reducers here
*/

const rootReducers = combineReducers({

    fileImporter:ImportFileReducer,
    querySearch:searchReducer
})

/*
This logger will gone tell us whats going in and 
out from the redux store
*/
const logger = store => {

    return next => {

            return action => {
                
                console.log('[Middleware] Dispatching', action);
                const result = next(action);
                console.log('[Middleware] next state', store.getState());
                return result;
            }
    }

}

/*
Applying middlware in order to use redux-thunk because we want 
to hold the update operation to the redux store the until our 
async all response arrived
*/

const store = createStore(rootReducers, applyMiddleware(logger,thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
