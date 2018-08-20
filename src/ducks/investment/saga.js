import { take, put, call, select} from 'redux-saga/effects'
import { BCSTContract, InvestmentContract} from '../../ethereum'
import { saga , investment } from '../types'
import axios from 'axios'

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
        const lowwerSymbol = 'bcst_cnyt'
		const corsURL = 'https://cors-anywhere.herokuapp.com/'
        const klinesApi = 'https://api.exx.com/data/v1/klines?'
        const callDate = investmentStatus.timestampDeposit - ( 60 * 60 * 24 * 8 )
		const klinesParam = `market=${lowwerSymbol}&type=1day&size=1000&since=${callDate}000`
		const klinesUri = corsURL + klinesApi + klinesParam
		const headers = { 'X-Requested-With': 'XMLHttpRequest' }        
        const klinesRes = yield call(axios.get, klinesUri, { headers })
        const lastTicker = klinesRes.data.datas.data[0]
        
        yield put({
            type: investment.UPDATE_INFO, 
            payload:  { 
                annualized: investmentStatus.annualized, 
                packetDay: investmentStatus.packetDay, 
                principle: investmentStatus.principle,
                returnInvestment: investmentStatus.returnInvestment,
                secondLeft: investmentStatus.secondLeft,
                dateDeposit: investmentStatus.timestampDeposit,
                rateCNYdeposit: lastTicker[2]
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
