import web3 from 'web3'
import { take, put, call, select} from 'redux-saga/effects'
import eth, { BCSTContract } from '../../ethereum'
import { saga } from '../types'


function *submitInvest() {
    while(true) {
        const { payload: { amount, packetDay } } = yield take(saga.SUBMIT_INVESTMENT)
        debugger


    }
}



export default function* investmentSaga() {
    yield [
        submitInvest(),
    ]
}
