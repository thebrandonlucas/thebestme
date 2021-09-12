import { useDispatch } from 'react-redux';
import firebase from "firebase"
import { Collections } from "../constants"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'

// Firebase Collections
export const FIRESTORE = 'FIRESTORE'
export const SET_DAY = 'SET_DAY'

export const FINISH_DAY = 'FINISH_DAY'
export const FINISH_DAY_SUCCESS = 'FINISH_DAY_SUCCESS'
export const FINISH_DAY_FAILURE = 'FINISH_DAY_FAILURE'

export const login = (userInfo) => {
    return {
        type: LOGIN, 
        payload: userInfo
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const signup = (userInfo) => {
    return {
        type: SIGNUP, 
        payload: userInfo
    }
}

// export const getDaysCollection = (db) => {
//     const daysCollection = db.collection(Collections.days);
//     console.log('passin');
//     return {
//         type: DAYS,
//         payload: daysCollection
//     }
// }

export const setDayInfo = (dayInfo) => {
    return {
        type: SET_DAY,
        payload: dayInfo
    }
}

export const uploadDayToFirebase = (dayInfo, daysCollection) => {
    // TODO: should we add FINISH_DAY hook for loading?
    try {
        console.log(dayInfo);
        daysCollection.add(dayInfo);
        return {
            type: FINISH_DAY_SUCCESS,
            payload: dayInfo
        }
    } catch (e) {
        console.log(e);
        return {
            type: FINISH_DAY_FAILURE,
            payload: { loading: false, error: true, message: e }
        }
    }
}

export const getDays = (daysCollection) => {
    
}