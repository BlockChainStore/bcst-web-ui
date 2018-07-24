// import { select, take, put, call, fork, cancel, apply } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import { take, put, call } from 'redux-saga/effects'
import eth, { bcst } from '../../ethereum'
import { saga, user } from '../types'


function *unlockWallet() {
    while(true) {
        const { payload: privateKey } = yield take(saga.UNLOCK_WALLET)

        const account = eth.accounts.privateKeyToAccount(privateKey)
        const bcstBalance = yield call(bcst.getBalance, account.address)
        const ethBalance = yield call(eth.getBalance, account.address)

        yield put({ 
            type: user.UPDATE_BCST, 
            payload: bcstBalance
        })
        yield put({ 
            type: user.UPDATE_ETH, 
            payload: ethBalance
        })
        yield put({
            type: user.UPDATE_INFO,
            payload: { 
                address: account.address, 
                privateKey 
            }
        })
    }
}

function *logoutWallet() {
    while(true) {
        yield take(saga.LOGOUT_WALLET)
        localStorage.clear()
    }
}

export default function* userSaga() {
    yield [
        unlockWallet(),
        logoutWallet(),
    ]
}
