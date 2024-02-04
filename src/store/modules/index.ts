import { legacy_createStore as createStore, combineReducers } from 'redux'

import circuitReducer from '../modules/dashboard/reducer'

const reducers = combineReducers({ circuit: circuitReducer })

const store = createStore(reducers)

export default store