import Web3 from 'web3'
import eth from '../ethereum-node'
import { sendRawTransaction } from '../utils'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods

const getBalance = (address) => cm.balanceOf(address).call()

const allowance = (address1, address2) => cm.allowance(address1, address2).call()

const transfer = async (
    { fromAddress, privateKey }, 
    { toAddress, amount },
    { gasPrice, gasLimit }
) => {
    const data = cm.transfer(toAddress, Web3.utils.toHex(amount)).encodeABI()
    const res = await sendRawTransaction(
        { fromAddress, privateKey },
        { contractAddress, data },
        { gasPrice, gasLimit }
    )
    return res
}

export default {
    getBalance,
    allowance,
    transfer
}