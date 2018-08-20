import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendDataToContract } from '../utils'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods

export default class InvestmentContract {
    constructor(privateKey) {
        this.fromAddress = eth.accounts
            .privateKeyToAccount(privateKey).address
        this.privateKey = privateKey
        this.contractAddress = contractAddress
        this.tokenDigit = 8
        this.data = '0x00'
    }

    getContractAddress = () => this.contractAddress

    checkStatus = () => cm.info(this.fromAddress).call()

    deposit = (amount, packetDay) => {
        this.data = cm.deposit(
            Web3.utils.toHex(amount * Math.pow(10, this.tokenDigit)), 
            Web3.utils.toHex(packetDay), 
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

