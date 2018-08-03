import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendDataToContract } from '../utils'
import { abi, contractAddress } from './config'
import web3 from 'web3'

import BCSTContract from '../bcst-contract'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods

export default class InvestmentContract {
    constructor(privateKey) {
        this.fromAddress = eth.accounts
            .privateKeyToAccount(privateKey).address
        this.privateKey = privateKey
        this.contractAddress = contractAddress
        this.data = '0x00'
    }

    checkStatus = () => cm.info(this.fromAddress).call()

    deposit = (amount, packetDay) => {
        this.data = cm.deposit(
            Web3.utils.toHex(amount), 
            Web3.utils.toHex(packetDay), 
            this.contractAddress
        ).encodeABI()
    }

    withdraw = () => {
        this.data = cm.withdraw().encodeABI()
    }

    send = (options) => {
        let gasLimit = null
        let gasPrice = null
        if(!!options) {
            gasLimit = options.gasLimit
            gasPrice = options.gasPrice
        }
        return sendDataToContract(
            this.privateKey,
            this.contractAddress,
            this.data,
            { gasPrice, gasLimit }
        )
    }
}

const privateKey = '0xa7ac7527f5a86dd4970375d0c2fff71871132088105025100b60441ec5d1ba6e'

const investmentContract = new InvestmentContract(privateKey)
const bcstContract = new BCSTContract(privateKey)

investmentContract.checkStatus().then(res => { 
    console.log('<--- checkStatus', res)
})

// bcstContract.approve(contractAddress, 20000)
// bcstContract.send().then(res => {
//     console.log(res)

//     investmentContract.deposit(20000, 30)
//     investmentContract.send().then(res => {
//         console.log(res)
//     })

// })

// investmentContract.withdraw()
// investmentContract.send().then(res => {
//     console.log(res)
// })



