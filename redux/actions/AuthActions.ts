import { LOGIN, LOGOUT, SIGNUP } from "./types/LoginActions.types"

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