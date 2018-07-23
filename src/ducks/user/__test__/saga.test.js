import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { bcst } from '../../../ethereum'
import { saga, user } from '../../types'
import userSaga from '../saga'


it('test uplock wallet', () => {
    return expectSaga(userSaga)
        // mock api bcst.getBalance return 700
        .provide([
            [matchers.call.fn(bcst.getBalance), 700]
        ])
        
        .put({
            type: user.UPDATE_INFO, 
            payload: {
                address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
                privateKey: '0000000000000000000000000000000000000000000000000000000000000001'
            }
        })
        .put({
            type: user.UPDATE_BCST, 
            payload: 700
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

