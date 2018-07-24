import eth from '../ethereum-node'
import { abi, contractAddress } from './config'

const contract = new eth.Contract(abi, contractAddress)