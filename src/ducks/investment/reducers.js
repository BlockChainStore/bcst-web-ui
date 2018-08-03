import { combineReducers } from "redux"
import { investment } from '../types'


/* State Shape
{
    info: {
        annualized: string,
        packetDay: string,
        principle: string,
        returnInvestment: string,
        secondLeft: string,
    },
}
*/

const initInfoState  = { 
    annualized: null, 
    packetDay: null, 
    principle: null,
    returnInvestment: null,
    secondLeft: null
}

export const infoReducer = (state = initInfoState, action) => {
    switch(action.type) {
        case investment.UPDATE_INFO:
            return { 
                annualized: action.payload.annualized, 
                packetDay: action.payload.packetDay, 
                principle: action.payload.principle,
                returnInvestment: action.payload.returnInvestment,
                secondLeft: action.payload.secondLeft
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    info: infoReducer,
})
 
export default reducers