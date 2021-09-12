const initialState: object = {
    daysCollection: {}
}

const collectionsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DAYS': 
           return action.payload
        // case 'HABITS': 
        //     return action.payload
        // case 'CBT':
        //     return {}
        default:
            return state
    }
}

export default collectionsReducer;