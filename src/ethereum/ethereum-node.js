import Web3 from 'web3'


const remoteNodeURL = process.env.NODE_ENV === 'production'
    ? 'https://mainnet.infura.io/WH95TkbW5GbBKghXTg0P'
    : 'https://ropsten.infura.io/WH95TkbW5GbBKghXTg0P'
const remoteNode = new Web3.providers.HttpProvider(remoteNodeURL)
const web3 = new Web3(remoteNode)

export default web3.eth