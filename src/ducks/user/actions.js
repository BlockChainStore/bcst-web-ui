import { saga } from '../types'

 
let actions = {}

actions.onUnlockWallet = (privateKey) => ({
    type: saga.UNLOCK_WALLET,
    payload: privateKey
})

actions.onLogoutWallet = () => ({
    type: saga.LOGOUT_WALLET
})

export default actions