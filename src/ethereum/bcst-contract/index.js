import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendDataToContract } from '../utils'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods


export default class BCSTContract {
    constructor(privateKey) {
        this.fromAddress = !!privateKey 
            ? eth.accounts.privateKeyToAccount(privateKey).address
            : null
        this.privateKey = privateKey || null
        this.contractAddress = contractAddress
        this.tokenDigit = 8
        this.data = '0x00'
    }

    getBalance = async (address) => {
        const value = await cm.balanceOf(address).call()
        return value / Math.pow(10, this.tokenDigit)
    }

    balance = async () => {
        const value = await cm.balanceOf(this.fromAddress).call()
        return value / Math.pow(10, this.tokenDigit)
    }

    transfer = (toAddress, amount) => {
        this.data = cm.transfer(
            toAddress, 
            Web3.utils.toHex(amount)
        ).encodeABI()
    }

    approve = (toAddress, amount) => {
        this.data = cm.approve(
            toAddress, 
            Web3.utils.toHex(amount)
        ).encodeABI()
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