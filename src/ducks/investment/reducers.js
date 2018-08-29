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
        packetDay: string,
        annualized: string,
        data: [
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
        case investment.PERSONAL_UPDATE_INFO:
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
    annualized: null,
    data: []
}

export const communityReducer = (state = initCommunityState, action) => {
    switch(action.type) {
        case investment.COMMUNITY_UPDATE_INFO:
            return {
                page: action.payload.page,
                total: action.payload.total,
                packetDay: action.payload.packetDay,
                annualized: action.payload.annualized,
                data: action.payload.data.map(item => ({
                    principle: item.principle,
                    returnInvestment: item.returnInvestment,
                    secondLeft: item.secondLeft,
                    dateDeposit: item.dateDeposit,
                }))
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    personal: personalReducer,
    community: communityReducer,
})
 
export default reducers