import { saga } from '../types'


let actions = {}

actions.onUnlockWallet = (address, privateKey) => ({
    type: saga.UNLOCK_WALLET,
    payload: { address, privateKey }
})

export default actions