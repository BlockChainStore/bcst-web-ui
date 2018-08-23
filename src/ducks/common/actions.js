import { common } from '../types'


let actions = {}

actions.onUpdateAlert = (type, message) => ({
    type: common.UPDATE_ALERT,
    payload: { type, message }
})

export default actions