export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'

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