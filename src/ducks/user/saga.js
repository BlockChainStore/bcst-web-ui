// import { select, take, put, call, fork, cancel, apply } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import { take, put } from 'redux-saga/effects'
import { saga, user } from '../types'

function *unlockWallet() {
    while(true) {
        const { 
            payload : { 
                address, 
                privateKey 
            } 
        } = yield take([saga.UNLOCK_WALLET])
        

        // unlock wallet here

        yield put({
            type: user.UPDATE_INFO,
            payload: { address, privateKey }
        })
    }
}

export default function* userSaga() {
    yield [
        unlockWallet(),
    ]
}
