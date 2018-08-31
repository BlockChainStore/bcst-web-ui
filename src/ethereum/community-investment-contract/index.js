import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendDataToContract } from '../utils'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods

export default class CommunityInvestmentContract {
    constructor(privateKey) {
        this.fromAddress = eth.accounts
            .privateKeyToAccount(privateKey).address
        this.privateKey = privateKey
        this.contractAddress = contractAddress
        this.tokenDigit = 8
        this.data = '0x00'
    }

    getContractAddress = () => this.contractAddress

    getPacketDay = () => cm.getPacketDay(this.fromAddress).call()
    
    getInfo = async () => {
        const { count } = await cm.getAvailable(this.fromAddress).call()
        if(count !== '0') {
            const infoFromIndex = await Promise.all(
                Array.apply(null, {length: parseInt(count, 10)})
                    .map((item, index) => cm.info(this.fromAddress, index).call())
            )
            return infoFromIndex.map(item => ({
                annualized: item.annualized / 1000,
                packetDays: item.packetDays,
                principle: item.principle / Math.pow(10, this.tokenDigit),
                secondLeft: item.secondLeft,
                profitReturn: item.profitReturn / Math.pow(10, this.tokenDigit),
                timestampDeposit: item.timestampDeposit
            }))
        }
        return []
    }

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

