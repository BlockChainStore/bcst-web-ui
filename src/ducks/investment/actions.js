import { saga } from '../types'


let actions = {}

actions.onSubmitInvestment = (amount, packetDay) => ({
    type: saga.SUBMIT_INVESTMENT,
    payload: { amount, packetDay }
})

actions.withdrawInvestment = () => ({
    type: saga.WITHDRAW_INVESTMENT,
})

export default actions