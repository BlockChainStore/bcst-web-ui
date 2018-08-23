import { combineReducers } from "redux"
import { common } from '../types'


/* State Shape
{
    sendTransaction: {
        loading: boolean,
        name: string,
    },
    alert:{
        type: string,
        message: string,
    }
}
*/

export const sendTransactionReducer = (state = { loading: false, name: null}, action) => {
    switch(action.type) {
        case common.UPDATE_SENDTRANSACTION:
            return { 
                loading: action.payload.loading,
                name: action.payload.name,
            } 
        default:
            return state
    }
}

export const alertReducer = (state = { type: null, message: null}, action) => {
    switch(action.type) {
        case common.UPDATE_ALERT:
            return { 
                type: action.payload.type,
                message: action.payload.message,
            } 
        default:
            return state
    }
}
const reducers = combineReducers({
    sendTransaction: sendTransactionReducer,
    alert: alertReducer
})
 
export default reducers