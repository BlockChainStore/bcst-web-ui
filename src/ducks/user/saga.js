import web3 from 'web3'
import { take, put, call, select} from 'redux-saga/effects'
import eth, { BCSTContract } from '../../ethereum'
import { saga, user, common } from '../types'
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

function *transerBCST() {
    while(true) {
        // console.log("Tranfer!!!")
        const { payload: { address, amount } } = yield take(saga.TRANSFER_BCST)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey

        if(!!privateKey) {
            const bcstContract = new BCSTContract(privateKey)

            yield put({
                type: common.UPDATE_SENDTRANSACTION , 
                payload : {
                    loading: true, 
                    name: 'TRANSFER_BCST'
                }
            })
            if(!!address) {
                bcstContract.transfer(address, amount)
                yield call(bcstContract.send)
            }

            yield put({ 
                type: common.UPDATE_SENDTRANSACTION, 
                payload: {
                    loading: false, 
                    name: null 
                }
            })
            yield put({ 
                type: common.UPDATE_ALERT, 
                payload: {
                    type: 'Success', 
                    message: 'Transfer success'
                }
            })

            const bcstBalance = yield call(bcstContract.balance)
            yield put({ 
                type: user.UPDATE_BCST, 
                payload: bcstBalance
            })
        }
    }
}


export default function* userSaga() {
    yield [
        unlockWallet(),
        unlockWalletSuccess(),
        logoutWallet(),
        fetchUserdata(),
        transerBCST(),
    ]
}
