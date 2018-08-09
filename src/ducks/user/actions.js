import { saga, user } from '../types'

 
let actions = {}

actions.onUnlockWallet = (privateKey) => ({
    type: saga.UNLOCK_WALLET,
    payload: privateKey
})

actions.onLogoutWallet = () => ({
    type: saga.LOGOUT_WALLET
})

actions.onChangeLanguage = (language) => ({
    type: user.UPDATE_LANGUAGE,
    payload: language
})

export default actions