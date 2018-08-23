import { saga } from '../types'


let actions = {}

actions.onSubmitInvestment = (amount, packetDay) => ({
    type: saga.SUBMIT_INVESTMENT,
    payload: { amount, packetDay }
})

actions.withdrawInvestment = (address, amount) => ({
    type: saga.WITHDRAW_INVESTMENT,
    payload: { address, amount }
})

actions.withdrawTo = (address, amount) => ({
    type: saga.WITHDRAW_TO,
    payload: { address, amount }
})

export default actions