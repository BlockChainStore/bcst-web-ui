import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import eth, { bcst } from '../../../ethereum'
import { saga, user } from '../../types'
import userSaga from '../saga'


it('test uplock wallet', () => {
    return expectSaga(userSaga)
        // mock api bcst.getBalance return 700
        .provide([
            [matchers.call.fn(bcst.getBalance), 700],
            [matchers.call.fn(eth.getBalance), 10]
        ])

        // expect actions
        .put({ type: user.UPDATE_BCST, payload: 700 })
        .put({ type: user.UPDATE_ETH, payload: 10 })
        .put({
            type: user.UPDATE_INFO, 
            payload: {
                address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
                privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'
            }
        })

        // ticker saga
        .dispatch({ 
            type: saga.UNLOCK_WALLET,
            payload: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'
        }).run({ silenceTimeout: true })
})

