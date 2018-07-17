import Web3 from 'web3'
import EthereumTx from 'ethereumjs-tx'
import eth from '../ethereum-node'
import { sendRawTransaction } from '../utils'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)
const cm = contract.methods

export const getBalance = (address) => cm.balanceOf(address).call()

export const totalSupply = () => cm.totalSupply().call()

export const symbol = () => cm.symbol().call()

export const name = () => cm.name().call()

export const allowance = (address1, address2) => cm.allowance(address1, address2).call()

export const transfer = async (
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