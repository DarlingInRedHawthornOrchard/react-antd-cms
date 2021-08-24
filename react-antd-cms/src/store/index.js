import { applyMiddleware, combineReducers, createStore, thunk } from 'redux'
import thunk from 'redux-thunk'
import dotState from './states/dotState'
import dotReducer from './reducers/dotReducer'



const allReducers = combineReducers({
  dotReducer
})

const store = createStore(allReducers, {
  dotState
}, applyMiddleware(thunk))

export default store