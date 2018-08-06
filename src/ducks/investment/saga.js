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
        bcstContract.send().then(res => {
            console.log(res)
            investmentContract.deposit(amount, packetDay)
            investmentContract.send().then(res => {
                console.log(res)
            })
        })
    }
}

function *withdrawInvestment() {
    while(true) {
        yield take(saga.WITHDRAW_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const investmentContract = new InvestmentContract(privateKey)

        investmentContract.withdraw()
        investmentContract.send().then(res => {
            console.log(res)
        })

    }
}



function *fetchStatus() {
    const store = yield select()
    const privateKey = store.duck.user.info.privateKey

    if(!!privateKey) {
        const investmentContract = new InvestmentContract(privateKey)
        const investmentStatus = yield call(investmentContract.checkStatus)
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


export default function* investmentSaga() {
    yield [
        submitInvest(),
        fetchStatus(),
        withdrawInvestment(),
    ]
}
