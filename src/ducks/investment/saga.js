import { take, put, call, select} from 'redux-saga/effects'
import { BCSTContract, InvestmentContract} from '../../ethereum'
import { saga , investment , common } from '../types'
import axios from 'axios'


function *submitInvest() {
    while(true) {
        const { payload: { amount, packetDay } } = yield take(saga.SUBMIT_INVESTMENT) 
        yield put({ 
            type: common.UPDATE_SENDTRANSACTION , 
            payload : {
                loading: true, 
                name: 'SUBMIT_INVESTMENT' 
            }
        })
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)
        const bcstContract = new BCSTContract(privateKey)
        
        try{
            bcstContract.approve(investmentContract.getContractAddress(), amount)
            const resApprove = yield call(bcstContract.send)
            console.log('[resApprove]', resApprove)
            investmentContract.deposit(amount, packetDay)
            const resDeposit = yield call(investmentContract.send)
            console.log('[resDeposit]', resDeposit)

            yield put({
                type: investment.UPDATE_INFO, 
                payload:  { 
                    annualized: '', 
                    packetDay: packetDay, 
                    principle: amount,
                    returnInvestment: '',
                    secondLeft: '',
                    dateDeposit: '',
                    rateCNYdeposit: ''
                }
            })

            yield put({ type: saga.FETCH_STATUS_INVESTMENT })
        } catch(e){
            yield put({ 
                type: common.UPDATE_ALERT, 
                payload: {
                    type: 'error', 
                    message: e.toString() 
                }
            })
        }
        yield put({ 
            type: common.UPDATE_SENDTRANSACTION, 
            payload: {
                loading: false, 
                name: null 
            }
        })
        
    }
}

function *withdrawInvestment() {
    while(true) {
        const { payload: { address, amount } } = yield take(saga.WITHDRAW_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)

        investmentContract.withdraw()
        yield call(investmentContract.send)
        
        if(!!address) {
            const bcstContract = new BCSTContract(privateKey)
            bcstContract.transfer(address, amount)
            yield call(bcstContract.send)
        }

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
        let lastTigger = null 
        let principle = 0
        try {
            principle = (investmentStatus.principle.toString() / Math.pow(10, 8)).toString()
            const lowwerSymbol = 'bcst_cnyt'
            const corsURL = 'https://cors-anywhere.herokuapp.com/'
            const klinesApi = 'https://api.exx.com/data/v1/klines?'
            const callDate = investmentStatus.timestampDeposit - ( 60 * 60 * 24 )
            const klinesParam = `market=${lowwerSymbol}&type=1day&size=200&since=${callDate}000`
            const klinesUri = corsURL + klinesApi + klinesParam
            const headers = { 'X-Requested-With': 'XMLHttpRequest' }
            const klinesRes = yield call(axios.get, klinesUri, { headers })
            lastTigger = klinesRes.data.datas.data[0][2]
            console.log('yerterday '+ klinesRes.data.datas.data[0])

        } catch (error) {
            
        }

        yield put({
            type: investment.UPDATE_INFO, 
            payload: {
                annualized: investmentStatus.annualized,
                packetDay: investmentStatus.packetDay,
                principle: principle,
                returnInvestment: investmentStatus.returnInvestment,
                secondLeft: investmentStatus.secondLeft,
                dateDeposit: investmentStatus.timestampDeposit,
                rateCNYdeposit: lastTigger,
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
