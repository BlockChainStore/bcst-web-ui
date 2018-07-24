import { combineReducers } from "redux"
import { user } from '../types'


/* State Shape
{
    info: {
        address: string,
        privateKey: string,
    },
    eth: decimal
    bcst: decimal,
}
*/

export const infoReducer = (state = { address: null, privateKey: null}, action) => {
    switch(action.type) {
        case user.UPDATE_INFO:
            return { 
                address: action.payload.address, 
                privateKey: action.payload.privateKey
            } 
        default:
            return state
    }
}

export const ethReducer = (state = null, action) => {
    switch(action.type) {
        case user.UPDATE_ETH:
            return action.payload
        default:
            return state
    }
}

export const bcstReducer = (state = null, action) => {
    switch(action.type) {
        case user.UPDATE_BCST:
            return action.payload
        default:
            return state
    }
}

const reducers = combineReducers({
    info: infoReducer,
    eth: ethReducer,
    bcst: bcstReducer
})
 
export default reducers