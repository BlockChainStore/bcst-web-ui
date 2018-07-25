import { saga } from '../../types'
import actions from '../actions'

it('test update info', () => {
    const expectAction = {
        type: saga.UNLOCK_WALLET,
        payload: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'
    }

    expect(actions.onUnlockWallet('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'))
    .toEqual(expectAction)
})

it('test update info', () => {
    const expectAction = {
        type: saga.LOGOUT_WALLET,
    }
    expect(actions.onLogoutWallet())
    .toEqual(expectAction)
})

