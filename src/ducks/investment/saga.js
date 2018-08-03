import web3 from 'web3'
import { take, put, call, select} from 'redux-saga/effects'
import { BCSTContract, InvestmentContract} from '../../ethereum'
import { saga } from '../types'


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

        // investmentContract.withdraw()
        // investmentContract.send().then(res => {
        //     console.log(res)
        // })

    }
}


function *fetchStatus() {
    const store = yield select()
    const privateKey = store.duck.user.info.privateKey
    const investmentContract = new InvestmentContract(privateKey)
    investmentContract.checkStatus().then(res => { 
        console.log('<--- checkStatus', res)
    })
}


export default function* investmentSaga() {
    yield [
        submitInvest(),
        fetchStatus(),
    ]
}
