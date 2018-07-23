import { saga } from '../../types'
import actions from '../actions'

it('test update info', () => {

    const expectAction = {
        type: saga.UNLOCK_WALLET,
        payload: {
            address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
            privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
        }
    }

    expect(
        actions.onUnlockWallet(
        '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        '0000000000000000000000000000000000000000000000000000000000000001'
        )
    ).toEqual(expectAction)

})

