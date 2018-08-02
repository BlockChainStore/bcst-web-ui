// import { select, take, put, call, fork, cancel, apply } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import web3 from 'web3'
import { take, put, call, select} from 'redux-saga/effects'
import eth, { BCSTContract } from '../../ethereum'
import { saga, user } from '../types'
import { localState } from '../ulits'


function *unlockWallet() {
    while(true) {
        const { payload: privateKey } = yield take(saga.UNLOCK_WALLET)

        const account = eth.accounts.privateKeyToAccount(privateKey)
        const bcstContract = new BCSTContract(privateKey)

        const bcstBalance = yield call(bcstContract.balance)
        const ethBalanceWei = yield call(eth.getBalance, account.address)
        const ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether')


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
        yield put({ type: saga.UNLOCK_WALLET_SUCCESS })
    }
}

function *unlockWalletSuccess() {
    while(true) {
        yield take(saga.UNLOCK_WALLET_SUCCESS)
        const state = yield select()
        localState.store(state)
        window.location = '/'
    }
}

function *logoutWallet() {
    while(true) {
        yield take(saga.LOGOUT_WALLET)
        localState.clear()
        window.location = '/'
    }
}

function *fetchUserdata() {
    const state = yield select()
    const privateKey = state.duck.user.info.privateKey
    if(!!privateKey) {
        const bcstContract = new BCSTContract(privateKey)

        const bcstBalance = yield call(bcstContract.balance)
        const ethBalanceWei = yield call(eth.getBalance, state.duck.user.info.address)
        const ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether')

        yield put({ 
            type: user.UPDATE_BCST, 
            payload: bcstBalance
        })
        yield put({ 
            type: user.UPDATE_ETH, 
            payload: ethBalance
        })
    }
}



export default function* userSaga() {
    yield [
        unlockWallet(),
        unlockWalletSuccess(),
        logoutWallet(),
        fetchUserdata(),
    ]
}
