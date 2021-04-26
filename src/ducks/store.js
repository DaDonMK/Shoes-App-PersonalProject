import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import loggedInReducer from './loggedInReducer';
import fullNameReducer from './fullNameReducer'

const rootReducer = combineReducers({
    logg:loggedInReducer,
    giveMeName:fullNameReducer
    
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));