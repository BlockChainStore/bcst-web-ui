import { saga } from '../types'


let actions = {}

actions.onSubmitInvestment = (amount, packetDay) => ({
    type: saga.SUBMIT_INVESTMENT,
    payload: { amount, packetDay }
})

export default actions