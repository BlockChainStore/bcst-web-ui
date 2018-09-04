import { take, put, call, select } from 'redux-saga/effects'
import { 
    BCSTContract, 
    PersonalInvestmentContract, 
    CommunityInvestmentContract
} from '../../ethereum'
import { saga , investment , common } from '../types'
import axios from 'axios'


function *submitPersonalInvest() {
    while(true) {
        const { payload: { amount, packetDay } } = yield take(saga.SUBMIT_PERSONAL_INVESTMENT) 
        yield put({ 
            type: common.UPDATE_SENDTRANSACTION , 
            payload : {
                loading: true, 
                name: 'SUBMIT_PERSONAL_INVESTMENT' 
            }
        })
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const personalInvestmentContract = new PersonalInvestmentContract(privateKey)
        const bcstContract = new BCSTContract(privateKey)
        
        try {
            bcstContract.approve(personalInvestmentContract.getContractAddress(), amount)
            const resApprove = yield call(bcstContract.send)
            console.log('[resApprove]', resApprove)
            personalInvestmentContract.deposit(amount, packetDay)
            const resDeposit = yield call(personalInvestmentContract.send)
            console.log('[resDeposit]', resDeposit)

            yield put({
                type: investment.PERSONAL_UPDATE_INFO, 
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

            yield put({ type: saga.FETCH_PERSONAL_INVESTMENT })
        } catch(e){
            yield put({ 
                type: common.UPDATE_ALERT, 
                payload: {
                    type: 'Error', 
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

function *withdrawPersonalInvestment() {
    while(true) {
        const { payload: { address, amount } } = yield take(saga.WITHDRAW_PERSONAL_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const personalInvestmentContract = new PersonalInvestmentContract(privateKey)

        personalInvestmentContract.withdraw()
        yield call(personalInvestmentContract.send)
        
        if(!!address) {
            const bcstContract = new BCSTContract(privateKey)
            bcstContract.transfer(address, amount)
            yield call(bcstContract.send)
        }

        yield put({ type: saga.FETCH_PERSONAL_INVESTMENT })
    }
}

function *submitCommunityInvest() {
    while(true) {
        const { payload: { amount, packetDay } } = yield take(saga.SUBMIT_COMMUNITY_INVESTMENT) 
        yield put({ 
            type: common.UPDATE_SENDTRANSACTION , 
            payload : {
                loading: true, 
                name: 'SUBMIT_COMMUNITY_INVESTMENT' 
            }
        })

        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const communityInvestmentContract = new CommunityInvestmentContract(privateKey)
        const bcstContract = new BCSTContract(privateKey)
        
        try {
            bcstContract.approve(communityInvestmentContract.getContractAddress(), amount)
            const resApprove = yield call(bcstContract.send)
            console.log('[resApprove]', resApprove)
            communityInvestmentContract.deposit(amount, packetDay)
            const resDeposit = yield call(communityInvestmentContract.send)
            console.log('[resDeposit]', resDeposit)
            yield put({ type: saga.FETCH_COMMUNITY_INVESTMENT })
            
            yield put({ 
                type: common.UPDATE_ALERT, 
                payload: {
                    type: 'Success', 
                    message: 'Deposit success'
                }
            })
        } catch(e){
            yield put({ 
                type: common.UPDATE_ALERT, 
                payload: {
                    type: 'Error', 
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

function *withdrawCommunityInvestment() {
    while(true) {
        const { payload: { address, amount } } = yield take(saga.WITHDRAW_COMMUNITY_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey

        yield put({ 
            type: common.UPDATE_SENDTRANSACTION , 
            payload : {
                loading: true, 
                name: 'WITHDRAW_COMMUNITY_INVESTMENT' 
            }
        })

        const communityInvestmentContract = new CommunityInvestmentContract(privateKey)
        communityInvestmentContract.withdraw()
        yield call(communityInvestmentContract.send)

        if(!!address) {
            const bcstContract = new BCSTContract(privateKey)
            bcstContract.transfer(address, amount)
            yield call(bcstContract.send)
        }

        yield put({ type: saga.FETCH_COMMUNITY_INVESTMENT })
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
                message: 'Withdraw success'
            }
        })
    }
}

function *fetchCommunity() {
    while(true) {
        yield take(saga.FETCH_COMMUNITY_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const communityInvestmentContract = new CommunityInvestmentContract(privateKey)
        const packetDay = yield call(communityInvestmentContract.getPacketDay)
        if(packetDay === '0') {
            yield put({
                type: investment.COMMUNITY_UPDATE_INFO, 
                payload: { packetDay: null, data: [] }
            })
        }
        else {
            const info = yield call(communityInvestmentContract.getInfo)
            yield put({
                type: investment.COMMUNITY_UPDATE_INFO, 
                payload: {
                    packetDay: packetDay,
                    data: info.map(item => ({
                        annualized: item.annualized,
                        principle: item.principle,
                        returnInvestment: item.profitReturn,
                        secondLeft: item.secondLeft,
                        dateDeposit: item.timestampDeposit
                    }))
                }
            })
        }

    }
}

function *fetchPersonal() {
    while(true) {
        yield take(saga.FETCH_PERSONAL_INVESTMENT)
        const store = yield select()
        const privateKey = store.duck.user.info.privateKey
        const personalInvestmentContract = new PersonalInvestmentContract(privateKey)
        const investmentStatus = yield call(personalInvestmentContract.checkStatus)
        let lastTigger = null 
        let principle = '0'
        if(investmentStatus.principle !== '0') {
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
            } catch (error) {
                
            }
        }

        yield put({
            type: investment.PERSONAL_UPDATE_INFO, 
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
        yield put({ type: saga.FETCH_PERSONAL_INVESTMENT })
        yield put({ type: saga.FETCH_COMMUNITY_INVESTMENT })
    }

}   

export default function* investmentSaga() {
    yield [
        submitPersonalInvest(),
        withdrawPersonalInvestment(),
        submitCommunityInvest(),
        withdrawCommunityInvestment(),
        fetchPersonal(),
        fetchCommunity(),
        init(),
    ]
}
