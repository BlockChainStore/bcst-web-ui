import { take, put, call, select} from 'redux-saga/effects'
import { BCSTContract, InvestmentContract} from '../../ethereum'
import { saga , investment } from '../types'


function *submitInvest() {
    while(true) {
        const { payload: { amount, packetDay } } = yield take(saga.SUBMIT_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)
        const bcstContract = new BCSTContract(privateKey)

        bcstContract.approve(investmentContract.getContractAddress(), amount)
        const resApprove = yield call(bcstContract.send)
        console.log('[resApprove]', resApprove)

        investmentContract.deposit(amount, packetDay)
        const resDeposit = yield call(investmentContract.send)
        console.log('[resDeposit]', resDeposit)

        yield put({ type: saga.FETCH_STATUS_INVESTMENT })
    }
}

function *withdrawInvestment() {
    while(true) {
        yield take(saga.WITHDRAW_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)

        investmentContract.withdraw()
        const resWithdraw = yield call(investmentContract.send)
        console.log('[resWithdraw]', resWithdraw)

        yield put({ type: saga.FETCH_STATUS_INVESTMENT })
    }
}

function *fetchStatus() {
    while(true) {
        yield take(saga.FETCH_STATUS_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)
        const investmentStatus = yield call(investmentContract.checkStatus)
        console.log('[checkStatus]', investmentStatus)

        yield put({
            type: investment.UPDATE_INFO, 
            payload:  { 
                annualized: investmentStatus.annualized, 
                packetDay: investmentStatus.packetDay, 
                principle: investmentStatus.principle,
                returnInvestment: investmentStatus.returnInvestment,
                secondLeft: investmentStatus.secondLeft
            }
        })
    }
}


function *init() {
    const store = yield select()
    const privateKey = store.duck.user.info.privateKey

    if(!!privateKey) {
        yield put({ type: saga.FETCH_STATUS_INVESTMENT })
    }

}   

export default function* investmentSaga() {
    yield [
        submitInvest(),
        fetchStatus(),
        withdrawInvestment(),
        init(),
    ]
}
