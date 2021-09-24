const initialState = {

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': 
           return { ...state, userInfo: action.payload }
        case 'SIGNUP': 
            return { ...state, userInfo: action.payload }
        case 'LOGOUT':
            return initialState
        default: 
            return state
    }
}

export default userReducer