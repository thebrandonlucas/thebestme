import { combineReducers } from 'redux'
import collectionsReducer from './collectionsReducer'
import dayReducer from './dayReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    day: dayReducer,
    collections: collectionsReducer
})

export default rootReducer