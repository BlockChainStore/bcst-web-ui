import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendDataToContract } from '../utils'
import { abi, contractAddress } from './config'
import web3 from 'web3'

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

    send = ({gasPrice, gasLimit}) => sendDataToContract(
        this.privateKey,
        this.contractAddress,
        this.data,
        { gasPrice, gasLimit }
    )
}

// const investmentContract = new InvestmentContract(
//     '0xa7ac7527f5a86dd4970375d0c2fff71871132088105025100b60441ec5d1ba6e'
// )

// investmentContract.checkStatus().then(res => { 
//     console.log('<--- checkStatus', res)
// })


// investmentContract.deposit(1000000, 90)
