import { saga } from '../types'


let actions = {}

actions.onUnlockWallet = (privateKey) => ({
    type: saga.UNLOCK_WALLET,
    payload: privateKey
})

export default actions