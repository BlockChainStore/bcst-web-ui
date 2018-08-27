import { combineReducers } from "redux"
import { investment } from '../types'


/* State Shape
{
    personal: {
        annualized: string,
        packetDay: string,
        principle: string,
        returnInvestment: string,
        secondLeft: string,
        dateDeposit: string,
        rateCNYdeposit: string
    },
    community: {
        page: int,
        total: int,
        packetDay: string
        data: [
            annualized: string,
            principle: string,
            returnInvestment: string,
            secondLeft: string,
            dateDeposit: string,
            rateCNYdeposit: string
        ]
    }
}
*/

const initPersonalState  = { 
    annualized: null, 
    packetDay: null, 
    principle: null,
    returnInvestment: null,
    secondLeft: null,
    dateDeposit: null,
    rateCNYdeposit: null,
}

export const personalReducer = (state = initPersonalState, action) => {
    switch(action.type) {
        case investment.UPDATE_INFO:
            return { 
                annualized: action.payload.annualized, 
                packetDay: action.payload.packetDay, 
                principle: action.payload.principle,
                returnInvestment: action.payload.returnInvestment,
                secondLeft: action.payload.secondLeft,
                dateDeposit: action.payload.dateDeposit,
                rateCNYdeposit: action.payload.rateCNYdeposit,
            }
        default:
            return state
    }
}

const initCommunityState = {
    page: null,
    total: null,
    packetDay: null,
    data: []
}

export const communityReducer = (state = initCommunityState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

const reducers = combineReducers({
    personal: personalReducer,
    community: communityReducer,
})
 
export default reducers