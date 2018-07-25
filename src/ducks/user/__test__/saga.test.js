import { select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import eth, { bcst } from '../../../ethereum'
import { saga, user } from '../../types'
import { localState } from '../../ulits'

import userSaga from '../saga'
import './browser-mocks'


it('test uplock wallet', () => {
    const storeMock = { duck: { state: 1234 } }
    return expectSaga(userSaga)
        // mock api bcst.getBalance return 700
        // mock api eth.getBalance return 700
        .withState(storeMock)
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
        .put({ type: saga.UNLOCK_WALLET_SUCCESS })

        // ticker saga
        .dispatch({ 
            type: saga.UNLOCK_WALLET,
            payload: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'
        }).run({ silenceTimeout: true })
})

it('test logout wallet', () => {
    return expectSaga(userSaga)
        .dispatch({ type: saga.LOGOUT_WALLET })
        .run({ silenceTimeout: true })
})




