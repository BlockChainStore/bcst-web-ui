import { expectSaga } from 'redux-saga-test-plan'
import { saga, user } from '../../types'
import userSaga from '../saga'


it('test uplock wallet', () => {

    return expectSaga(userSaga)
        .put({
            type: user.UPDATE_INFO, 
            payload: {
                address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
                privateKey: '0000000000000000000000000000000000000000000000000000000000000001'
            }
        })

        // dispatch any actions your saga will `take`
        .dispatch({ 
            type: saga.UNLOCK_WALLET,
            payload: {
                address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
                privateKey: '0000000000000000000000000000000000000000000000000000000000000001'
            }
        })
        .run({ silenceTimeout: true })
})

