import { saga } from '../types'


let actions = {}

actions.onSubmitPersonalInvestment = (amount, packetDay) => ({
    type: saga.SUBMIT_PERSONAL_INVESTMENT,
    payload: { amount, packetDay }
})

actions.withdrawPersonalInvestment = (address, amount) => ({
    type: saga.WITHDRAW_PERSONAL_INVESTMENT,
    payload: { address, amount }
})

actions.onSubmitCommunityInvestment = (amount, packetDay) => ({
    type: saga.SUBMIT_COMMUNITY_INVESTMENT,
    payload: { amount, packetDay }
})

actions.withdrawCommunityInvestment = (address, amount) => ({
    type: saga.WITHDRAW_COMMUNITY_INVESTMENT,
    payload: { address, amount }
})

export default actions