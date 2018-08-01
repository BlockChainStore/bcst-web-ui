import eth from '../ethereum-node'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)

const cm = contract.methods

const getBalance = (address) => cm.balanceOf(address).call()

const allowance = (address1, address2) => cm.allowance(address1, address2).call()
